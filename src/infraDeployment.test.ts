import { describe, expect, it } from 'bun:test';

import { INFRA_ADAPTER_CATALOG, INFRA_RUNTIME_COMPATIBILITY, isInfraDeploymentSpec } from './infra';

const awsEc2 = {
  provider: 'aws-ec2',
  region: 'eu-central-1',
  instanceType: 't3.large',
  ami: 'ami-0123456789abcdef0',
  architecture: 'x86_64',
  vpcId: 'vpc-0123456789abcdef0',
  subnetId: 'subnet-0123456789abcdef0',
  securityGroupIds: ['sg-0123456789abcdef0'],
  ssh: {
    keyName: 'project-production',
    credentials: { source: 'control-plane', name: 'AWS_EC2_SSH' },
    hostKeyFingerprint: 'SHA256:expected-host-key',
    authorizedCidrs: ['203.0.113.10/32'],
  },
} as const;

describe('exact deployment compatibility', () => {
  it('tests every registered compute/runtime pair against the same catalog', () => {
    const computes = Object.values(INFRA_ADAPTER_CATALOG).filter(
      (entry) => entry.kind === 'compute',
    );
    for (const compute of computes) {
      for (const [runtime, allowed] of Object.entries(INFRA_RUNTIME_COMPATIBILITY)) {
        const selection = {
          compute:
            compute.id === 'local'
              ? { provider: 'local' }
              : compute.id === 'hetzner'
                ? { provider: 'hetzner', location: 'nbg1' }
                : awsEc2,
          runtime: { provider: runtime },
        };
        expect(isInfraDeploymentSpec(selection)).toBe(allowed.some((id) => id === compute.id));
      }
    }
  });

  it.each([
    { compute: { provider: 'gcp' }, runtime: { provider: 'ecs' } },
    { compute: { provider: 'hetzner', location: 'nbg1' }, runtime: { provider: 'eks' } },
    { compute: { provider: 'hetzner', location: 'nbg1' }, runtime: { provider: 'minikube' } },
    { compute: { provider: 'hetzner' }, runtime: { provider: 'k3s' } },
    { compute: { provider: 'hetzner', location: ' ' }, runtime: { provider: 'k3s' } },
    { compute: { provider: 'local', location: 'nbg1' }, runtime: { provider: 'k3s' } },
    { compute: { ...awsEc2, securityGroupIds: [], ssh: {} }, runtime: { provider: 'k3s' } },
  ])('rejects unsupported/config-mismatched deployment: %j', (value) => {
    expect(isInfraDeploymentSpec(value)).toBe(false);
  });

  it('accepts secure AWS EC2 configuration with optional instance resources', () => {
    expect(
      isInfraDeploymentSpec({
        compute: {
          ...awsEc2,
          iamInstanceProfile: 'hydradb-production',
          rootVolume: { sizeGiB: 80, type: 'gp3' },
          tags: { costCenter: 'hydradb' },
        },
        runtime: { provider: 'docker-compose' },
      }),
    ).toBe(true);
  });
});
