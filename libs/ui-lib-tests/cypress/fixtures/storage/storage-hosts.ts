import { fakeClusterId } from '../cluster/base-cluster';
import { createHostInventory, createHostInventoryWithDiskHolders } from './host-inventory';

const operatorValidations = [
  {
    id: 'cnv-requirements-satisfied',
    status: 'success',
    message: 'cnv is disabled',
  },
  {
    id: 'lso-requirements-satisfied',
    status: 'success',
    message: 'lso is disabled',
  },
  {
    id: 'odf-requirements-satisfied',
    status: 'success',
    message: 'odf is disabled',
  },
  {
    id: 'lvm-requirements-satisfied',
    status: 'success',
    message: 'lvm is disabled',
  },
];

const hostValidationInfo = {
  hardware: [
    {
      id: 'has-inventory',
      status: 'success',
      message: 'Valid inventory exists for the host',
    },
    {
      id: 'has-min-cpu-cores',
      status: 'success',
      message: 'Sufficient CPU cores',
    },
    {
      id: 'has-min-memory',
      status: 'success',
      message: 'Sufficient minimum RAM',
    },
    {
      id: 'has-min-valid-disks',
      status: 'success',
      message: 'Sufficient disk capacity',
    },
    {
      id: 'has-cpu-cores-for-role',
      status: 'success',
      message: 'Sufficient CPU cores for role worker',
    },
    {
      id: 'has-memory-for-role',
      status: 'success',
      message: 'Sufficient RAM for role worker',
    },
    {
      id: 'hostname-unique',
      status: 'success',
      message: 'Hostname storage-test-odf-worker-2 is unique in cluster',
    },
    {
      id: 'hostname-valid',
      status: 'success',
      message: 'Hostname storage-test-odf-worker-2 is allowed',
    },
    {
      id: 'sufficient-installation-disk-speed',
      status: 'success',
      message: 'Speed of installation disk has not yet been measured',
    },
    {
      id: 'compatible-with-cluster-platform',
      status: 'success',
      message: 'Host is compatible with cluster platform baremetal',
    },
    {
      id: 'no-skip-installation-disk',
      status: 'success',
      message: 'No request to skip formatting of the installation disk',
    },
    {
      id: 'no-skip-missing-disk',
      status: 'success',
      message: 'All disks that have skipped formatting are present in the host inventory',
    },
  ],
  network: [
    {
      id: 'connected',
      status: 'success',
      message: 'Host is connected',
    },
    {
      id: 'media-connected',
      status: 'success',
      message: 'Media device is connected',
    },
    {
      id: 'valid-platform-network-settings',
      status: 'success',
      message: 'Platform KVM is allowed',
    },
    {
      id: 'ntp-synced',
      status: 'failure',
      message: 'Host couldnt synchronize with any NTP server',
    },
  ],
  operators: operatorValidations,
};

const masterMemory = 17179869184; // 10.74 GB
const workerMemory = 7179869184; // TODO

const masterDisk = 17797418240; // 17.80 GB
const workerDisk = 10476748240; // 10.48 GB

const installationDiskIds = [
  '/dev/disk/by-path/pci-0000:00:08.0', // LVM
  '/dev/disk/by-path/pci-0000:00:09.0', // raid
  '/dev/disk/by-path/ip-192.168.123.49:3260', //multipath
  '/dev/disk/by-path/pci-0000:00:05.0-ata-3', // sr0
  '/dev/disk/by-path/pci-0000:00:05.0-ata-3', // sr0
];

const hosts = [
  {
    checked_in_at: '2022-08-16T15:02:43.543Z',
    cluster_id: fakeClusterId,
    connectivity:
      '{"remote_hosts":[{"host_id":"04ce1396-404e-4967-814c-c10f163dd35a","l2_connectivity":[{"outgoing_ip_address":"192.168.122.76","outgoing_nic":"enp1s0","remote_ip_address":"192.168.122.230","remote_mac":"52:54:00:4b:cb:49","successful":true}],"l3_connectivity":[{"average_rtt_ms":0.187,"outgoing_nic":"enp1s0","remote_ip_address":"192.168.122.230","successful":true}]},{"host_id":"55a258b2-687d-48de-9549-8e9b5b63cd9e","l2_connectivity":[{"outgoing_ip_address":"192.168.122.76","outgoing_nic":"enp1s0","remote_ip_address":"192.168.122.151","remote_mac":"52:54:00:d0:d0:f0","successful":true}],"l3_connectivity":[{"average_rtt_ms":0.196,"outgoing_nic":"enp1s0","remote_ip_address":"192.168.122.151","successful":true}]},{"host_id":"c2839ec2-3a70-421a-8a6a-a537aa4df609","l2_connectivity":[{"outgoing_ip_address":"192.168.122.76","outgoing_nic":"enp1s0","remote_ip_address":"192.168.122.214","remote_mac":"52:54:00:d1:cf:4f","successful":true}],"l3_connectivity":[{"average_rtt_ms":0.202,"outgoing_nic":"enp1s0","remote_ip_address":"192.168.122.214","successful":true}]},{"host_id":"cf2f3477-896f-40be-876a-b2ac3f2a838c","l2_connectivity":[{"outgoing_ip_address":"192.168.122.76","outgoing_nic":"enp1s0","remote_ip_address":"192.168.122.169","remote_mac":"52:54:00:10:26:08","successful":true}],"l3_connectivity":[{"average_rtt_ms":0.193,"outgoing_nic":"enp1s0","remote_ip_address":"192.168.122.169","successful":true}]}]}',
    created_at: '2022-08-16T13:26:42.43403Z',
    deleted_at: null,
    discovery_agent_version: 'quay.io/edge-infrastructure/assisted-installer-agent:latest',
    domain_name_resolutions:
      '{"resolutions":[{"domain_name":"api.storage-test-odf.redhat.com","ipv4_addresses":[],"ipv6_addresses":[]},{"domain_name":"api-int.storage-test-odf.redhat.com","ipv4_addresses":[],"ipv6_addresses":[]},{"domain_name":"console-openshift-console.apps.storage-test-odf.redhat.com","ipv4_addresses":[],"ipv6_addresses":[]},{"domain_name":"validateNoWildcardDNS.storage-test-odf.redhat.com","ipv4_addresses":[],"ipv6_addresses":[]}]}',
    href: '/api/assisted-install/v2/infra-envs/56dc322e-d6bc-4493-9c41-7ee277e98586/hosts/bb566d48-9b73-4047-9d4c-ae08618a5ed1',
    id: 'bb566d48-9b73-4047-9d4c-ae08618a5ed1',
    infra_env_id: '56dc322e-d6bc-4493-9c41-7ee277e98586',
    installation_disk_id: '/dev/disk/by-path/pci-0000:00:1f.2-ata-1',
    installation_disk_path: '/dev/sda',
    inventory: JSON.stringify(createHostInventory(1, masterMemory, masterDisk)),
    kind: 'Host',
    logs_collected_at: '0001-01-01T00:00:00.000Z',
    logs_started_at: '0001-01-01T00:00:00.000Z',
    ntp_sources:
      '[{"source_name":"ns-he.la.spb.ru","source_state":"unreachable"},{"source_name":"inter.tyjo.eu","source_state":"unreachable"},{"source_name":"janetzki.eu","source_state":"unreachable"},{"source_name":"ntp1.wiktel.com","source_state":"unreachable"},{"source_name":"t2.time.bf1.yahoo.com","source_state":"unreachable"},{"source_name":"briareus.schulte.org","source_state":"unreachable"},{"source_name":"2603:c020:0:8369:16e7:baf9:64d9:7355","source_state":"unreachable"},{"source_name":"2601:603:b7f:fec0::f00d:feed","source_state":"unreachable"}]',
    progress: {
      stage_started_at: '0001-01-01T00:00:00.000Z',
      stage_updated_at: '0001-01-01T00:00:00.000Z',
    },
    progress_stages: [
      'Starting installation',
      'Installing',
      'Writing image to disk',
      'Rebooting',
      'Configuring',
      'Joined',
      'Done',
    ],
    registered_at: '2022-08-16T13:26:42.432Z',
    requested_hostname: 'storage-test-odf-master-1',
    role: 'master',
    stage_started_at: '0001-01-01T00:00:00.000Z',
    stage_updated_at: '0001-01-01T00:00:00.000Z',
    status: 'known',
    status_info: 'Host is ready to be installed',
    status_updated_at: '2022-08-16T13:26:46.139Z',
    suggested_role: 'master',
    timestamp: 1660904262,
    updated_at: '2022-08-16T15:02:52.747661Z',
    user_name: 'admin',
    validations_info: JSON.stringify(hostValidationInfo),
  },
  {
    checked_in_at: '2022-08-16T15:02:47.832Z',
    cluster_id: fakeClusterId,
    connectivity:
      '{"remote_hosts":[{"host_id":"04ce1396-404e-4967-814c-c10f163dd35a","l2_connectivity":[{"outgoing_ip_address":"192.168.122.214","outgoing_nic":"enp1s0","remote_ip_address":"192.168.122.230","remote_mac":"52:54:00:4b:cb:49","successful":true}],"l3_connectivity":[{"average_rtt_ms":0.165,"outgoing_nic":"enp1s0","remote_ip_address":"192.168.122.230","successful":true}]},{"host_id":"55a258b2-687d-48de-9549-8e9b5b63cd9e","l2_connectivity":[{"outgoing_ip_address":"192.168.122.214","outgoing_nic":"enp1s0","remote_ip_address":"192.168.122.151","remote_mac":"52:54:00:d0:d0:f0","successful":true}],"l3_connectivity":[{"average_rtt_ms":0.153,"outgoing_nic":"enp1s0","remote_ip_address":"192.168.122.151","successful":true}]},{"host_id":"bb566d48-9b73-4047-9d4c-ae08618a5ed1","l2_connectivity":[{"outgoing_ip_address":"192.168.122.214","outgoing_nic":"enp1s0","remote_ip_address":"192.168.122.76","remote_mac":"52:54:00:5b:7f:95","successful":true}],"l3_connectivity":[{"average_rtt_ms":0.155,"outgoing_nic":"enp1s0","remote_ip_address":"192.168.122.76","successful":true}]},{"host_id":"cf2f3477-896f-40be-876a-b2ac3f2a838c","l2_connectivity":[{"outgoing_ip_address":"192.168.122.214","outgoing_nic":"enp1s0","remote_ip_address":"192.168.122.169","remote_mac":"52:54:00:10:26:08","successful":true}],"l3_connectivity":[{"average_rtt_ms":0.175,"outgoing_nic":"enp1s0","remote_ip_address":"192.168.122.169","successful":true}]}]}',
    created_at: '2022-08-16T13:26:46.859507Z',
    deleted_at: null,
    discovery_agent_version: 'quay.io/edge-infrastructure/assisted-installer-agent:latest',
    domain_name_resolutions:
      '{"resolutions":[{"domain_name":"api.storage-test-odf.redhat.com","ipv4_addresses":[],"ipv6_addresses":[]},{"domain_name":"api-int.storage-test-odf.redhat.com","ipv4_addresses":[],"ipv6_addresses":[]},{"domain_name":"console-openshift-console.apps.storage-test-odf.redhat.com","ipv4_addresses":[],"ipv6_addresses":[]},{"domain_name":"validateNoWildcardDNS.storage-test-odf.redhat.com","ipv4_addresses":[],"ipv6_addresses":[]}]}',
    href: '/api/assisted-install/v2/infra-envs/56dc322e-d6bc-4493-9c41-7ee277e98586/hosts/c2839ec2-3a70-421a-8a6a-a537aa4df609',
    id: 'c2839ec2-3a70-421a-8a6a-a537aa4df609',
    infra_env_id: '56dc322e-d6bc-4493-9c41-7ee277e98586',
    installation_disk_id: '/dev/disk/by-path/pci-0000:00:1f.2-ata-1',
    installation_disk_path: '/dev/sda',
    inventory: JSON.stringify(createHostInventory(2, masterMemory, masterDisk)),
    kind: 'Host',
    logs_collected_at: '0001-01-01T00:00:00.000Z',
    logs_started_at: '0001-01-01T00:00:00.000Z',
    ntp_sources:
      '[{"source_name":"janetzki.eu","source_state":"unreachable"},{"source_name":"38.229.59.9","source_state":"unreachable"},{"source_name":"t2.time.gq1.yahoo.com","source_state":"unreachable"},{"source_name":"2603:c020:0:8369:fec0:b7f:603:2601","source_state":"unreachable"},{"source_name":"2603:c020:0:8369:16e7:baf9:64d9:7355","source_state":"unreachable"},{"source_name":"briareus.schulte.org","source_state":"unreachable"},{"source_name":"t2.time.bf1.yahoo.com","source_state":"unreachable"},{"source_name":"2601:603:b7f:fec0::f00d:feed","source_state":"unreachable"}]',
    progress: {
      stage_started_at: '0001-01-01T00:00:00.000Z',
      stage_updated_at: '0001-01-01T00:00:00.000Z',
    },
    progress_stages: [
      'Starting installation',
      'Installing',
      'Writing image to disk',
      'Rebooting',
      'Configuring',
      'Joined',
      'Done',
    ],
    registered_at: '2022-08-16T13:26:46.856Z',
    requested_hostname: 'storage-test-odf-master-2',
    role: 'master',
    stage_started_at: '0001-01-01T00:00:00.000Z',
    stage_updated_at: '0001-01-01T00:00:00.000Z',
    status: 'known',
    status_info: 'Host is ready to be installed',
    status_updated_at: '2022-08-16T13:26:54.129Z',
    suggested_role: 'master',
    timestamp: 1660904266,
    updated_at: '2022-08-16T15:02:47.832863Z',
    user_name: 'admin',
    validations_info: JSON.stringify(hostValidationInfo),
  },
  {
    checked_in_at: '2022-08-16T15:02:48.432Z',
    cluster_id: fakeClusterId,
    connectivity:
      '{"remote_hosts":[{"host_id":"55a258b2-687d-48de-9549-8e9b5b63cd9e","l2_connectivity":[{"outgoing_ip_address":"192.168.122.230","outgoing_nic":"enp1s0","remote_ip_address":"192.168.122.151","remote_mac":"52:54:00:d0:d0:f0","successful":true}],"l3_connectivity":[{"average_rtt_ms":0.219,"outgoing_nic":"enp1s0","remote_ip_address":"192.168.122.151","successful":true}]},{"host_id":"bb566d48-9b73-4047-9d4c-ae08618a5ed1","l2_connectivity":[{"outgoing_ip_address":"192.168.122.230","outgoing_nic":"enp1s0","remote_ip_address":"192.168.122.76","remote_mac":"52:54:00:5b:7f:95","successful":true}],"l3_connectivity":[{"average_rtt_ms":0.217,"outgoing_nic":"enp1s0","remote_ip_address":"192.168.122.76","successful":true}]},{"host_id":"c2839ec2-3a70-421a-8a6a-a537aa4df609","l2_connectivity":[{"outgoing_ip_address":"192.168.122.230","outgoing_nic":"enp1s0","remote_ip_address":"192.168.122.214","remote_mac":"52:54:00:d1:cf:4f","successful":true}],"l3_connectivity":[{"average_rtt_ms":0.22,"outgoing_nic":"enp1s0","remote_ip_address":"192.168.122.214","successful":true}]},{"host_id":"cf2f3477-896f-40be-876a-b2ac3f2a838c","l2_connectivity":[{"outgoing_ip_address":"192.168.122.230","outgoing_nic":"enp1s0","remote_ip_address":"192.168.122.169","remote_mac":"52:54:00:10:26:08","successful":true}],"l3_connectivity":[{"average_rtt_ms":0.21,"outgoing_nic":"enp1s0","remote_ip_address":"192.168.122.169","successful":true}]}]}',
    created_at: '2022-08-16T13:26:47.505466Z',
    deleted_at: null,
    discovery_agent_version: 'quay.io/edge-infrastructure/assisted-installer-agent:latest',
    domain_name_resolutions:
      '{"resolutions":[{"domain_name":"api.storage-test-odf.redhat.com","ipv4_addresses":[],"ipv6_addresses":[]},{"domain_name":"api-int.storage-test-odf.redhat.com","ipv4_addresses":[],"ipv6_addresses":[]},{"domain_name":"console-openshift-console.apps.storage-test-odf.redhat.com","ipv4_addresses":[],"ipv6_addresses":[]},{"domain_name":"validateNoWildcardDNS.storage-test-odf.redhat.com","ipv4_addresses":[],"ipv6_addresses":[]}]}',
    href: '/api/assisted-install/v2/infra-envs/56dc322e-d6bc-4493-9c41-7ee277e98586/hosts/04ce1396-404e-4967-814c-c10f163dd35a',
    id: '04ce1396-404e-4967-814c-c10f163dd35a',
    infra_env_id: '56dc322e-d6bc-4493-9c41-7ee277e98586',
    installation_disk_id: '/dev/disk/by-path/pci-0000:00:1f.2-ata-1',
    installation_disk_path: '/dev/sda',
    inventory: JSON.stringify(createHostInventory(3, masterMemory, masterDisk)),
    kind: 'Host',
    logs_collected_at: '0001-01-01T00:00:00.000Z',
    logs_started_at: '0001-01-01T00:00:00.000Z',
    ntp_sources:
      '[{"source_name":"185.80.247.36","source_state":"unreachable"},{"source_name":"c-73-61-36-59.hsd1.nh.comcast.net","source_state":"unreachable"},{"source_name":"2001:470:1d:56a::120","source_state":"unreachable"},{"source_name":"ntp44.kashra-server.com","source_state":"unreachable"},{"source_name":"2601:603:b7f:fec0::f00d:feed","source_state":"unreachable"},{"source_name":"2603:c020:0:8369:16e7:baf9:64d9:7355","source_state":"unreachable"},{"source_name":"briareus.schulte.org","source_state":"unreachable"},{"source_name":"t2.time.bf1.yahoo.com","source_state":"unreachable"}]',
    progress: {
      stage_started_at: '0001-01-01T00:00:00.000Z',
      stage_updated_at: '0001-01-01T00:00:00.000Z',
    },
    progress_stages: [
      'Starting installation',
      'Installing',
      'Writing image to disk',
      'Rebooting',
      'Configuring',
      'Joined',
      'Done',
    ],
    registered_at: '2022-08-16T13:26:47.504Z',
    requested_hostname: 'storage-test-odf-master-3',
    role: 'master',
    stage_started_at: '0001-01-01T00:00:00.000Z',
    stage_updated_at: '0001-01-01T00:00:00.000Z',
    status: 'known',
    status_info: 'Host is ready to be installed',
    status_updated_at: '2022-08-16T13:26:54.136Z',
    suggested_role: 'master',
    timestamp: 1660904266,
    updated_at: '2022-08-16T15:02:48.432145Z',
    user_name: 'admin',
    validations_info: JSON.stringify(hostValidationInfo),
  },
  {
    checked_in_at: '2022-08-16T15:02:48.975Z',
    cluster_id: fakeClusterId,
    connectivity:
      '{"remote_hosts":[{"host_id":"04ce1396-404e-4967-814c-c10f163dd35a","l2_connectivity":[{"outgoing_ip_address":"192.168.122.169","outgoing_nic":"enp1s0","remote_ip_address":"192.168.122.230","remote_mac":"52:54:00:4b:cb:49","successful":true}],"l3_connectivity":[{"average_rtt_ms":0.706,"outgoing_nic":"enp1s0","remote_ip_address":"192.168.122.230","successful":true}]},{"host_id":"55a258b2-687d-48de-9549-8e9b5b63cd9e","l2_connectivity":[{"outgoing_ip_address":"192.168.122.169","outgoing_nic":"enp1s0","remote_ip_address":"192.168.122.151","remote_mac":"52:54:00:d0:d0:f0","successful":true}],"l3_connectivity":[{"average_rtt_ms":0.255,"outgoing_nic":"enp1s0","remote_ip_address":"192.168.122.151","successful":true}]},{"host_id":"bb566d48-9b73-4047-9d4c-ae08618a5ed1","l2_connectivity":[{"outgoing_ip_address":"192.168.122.169","outgoing_nic":"enp1s0","remote_ip_address":"192.168.122.76","remote_mac":"52:54:00:5b:7f:95","successful":true}],"l3_connectivity":[{"average_rtt_ms":0.243,"outgoing_nic":"enp1s0","remote_ip_address":"192.168.122.76","successful":true}]},{"host_id":"c2839ec2-3a70-421a-8a6a-a537aa4df609","l2_connectivity":[{"outgoing_ip_address":"192.168.122.169","outgoing_nic":"enp1s0","remote_ip_address":"192.168.122.214","remote_mac":"52:54:00:d1:cf:4f","successful":true}],"l3_connectivity":[{"average_rtt_ms":0.213,"outgoing_nic":"enp1s0","remote_ip_address":"192.168.122.214","successful":true}]}]}',
    created_at: '2022-08-16T13:26:48.076809Z',
    deleted_at: null,
    discovery_agent_version: 'quay.io/edge-infrastructure/assisted-installer-agent:latest',
    disks_to_be_formatted:
      '/dev/disk/by-path/pci-0000:00:1f.2-ata-40,/dev/disk/by-path/pci-0000:00:1f.2-ata-41,/dev/disk/by-path/pci-0000:00:1f.2-ata-42',
    domain_name_resolutions:
      '{"resolutions":[{"domain_name":"api.storage-test-odf.redhat.com","ipv4_addresses":[],"ipv6_addresses":[]},{"domain_name":"api-int.storage-test-odf.redhat.com","ipv4_addresses":[],"ipv6_addresses":[]},{"domain_name":"console-openshift-console.apps.storage-test-odf.redhat.com","ipv4_addresses":[],"ipv6_addresses":[]},{"domain_name":"validateNoWildcardDNS.storage-test-odf.redhat.com","ipv4_addresses":[],"ipv6_addresses":[]}]}',
    href: '/api/assisted-install/v2/infra-envs/56dc322e-d6bc-4493-9c41-7ee277e98586/hosts/cf2f3477-896f-40be-876a-b2ac3f2a838c',
    id: 'cf2f3477-896f-40be-876a-b2ac3f2a838c',
    infra_env_id: '56dc322e-d6bc-4493-9c41-7ee277e98586',
    installation_disk_id: '/dev/disk/by-path/pci-0000:00:1f.2-ata-41',
    installation_disk_path: '/dev/sda',
    inventory: JSON.stringify(createHostInventory(4, workerMemory, workerDisk)),
    kind: 'Host',
    logs_collected_at: '0001-01-01T00:00:00.000Z',
    logs_started_at: '0001-01-01T00:00:00.000Z',
    ntp_sources:
      '[{"source_name":"2a02:e00:fff0:5db::1","source_state":"unreachable"},{"source_name":"ntp44.kashra-server.com","source_state":"unreachable"},{"source_name":"tick.srs1.ntfo.org","source_state":"unreachable"},{"source_name":"omay.w1nr.net","source_state":"unreachable"},{"source_name":"briareus.schulte.org","source_state":"unreachable"},{"source_name":"t2.time.bf1.yahoo.com","source_state":"unreachable"},{"source_name":"2601:603:b7f:fec0::f00d:feed","source_state":"unreachable"},{"source_name":"2603:c020:0:8369:16e7:baf9:64d9:7355","source_state":"unreachable"}]',
    progress: {
      stage_started_at: '0001-01-01T00:00:00.000Z',
      stage_updated_at: '0001-01-01T00:00:00.000Z',
    },
    progress_stages: [
      'Starting installation',
      'Installing',
      'Writing image to disk',
      'Waiting for control plane',
      'Rebooting',
      'Waiting for ignition',
      'Configuring',
      'Joined',
      'Done',
    ],
    registered_at: '2022-08-16T13:26:48.075Z',
    requested_hostname: 'storage-test-odf-worker-1',
    role: 'worker',
    skip_formatting_disks: '/dev/disk/by-path/pci-0000:00:1f.2-ata-40',
    stage_started_at: '0001-01-01T00:00:00.000Z',
    stage_updated_at: '0001-01-01T00:00:00.000Z',
    status: 'known',
    status_info: 'Host is ready to be installed',
    status_updated_at: '2022-08-16T13:26:54.150Z',
    suggested_role: 'worker',
    timestamp: 1660904267,
    updated_at: '2022-08-16T15:02:48.975403Z',
    user_name: 'admin',
    validations_info: JSON.stringify(hostValidationInfo),
  },
  {
    checked_in_at: '2022-08-16T15:02:48.667Z',
    cluster_id: fakeClusterId,
    connectivity:
      '{"remote_hosts":[{"host_id":"04ce1396-404e-4967-814c-c10f163dd35a","l2_connectivity":[{"outgoing_ip_address":"192.168.122.151","outgoing_nic":"enp1s0","remote_ip_address":"192.168.122.230","remote_mac":"52:54:00:4b:cb:49","successful":true}],"l3_connectivity":[{"average_rtt_ms":0.381,"outgoing_nic":"enp1s0","remote_ip_address":"192.168.122.230","successful":true}]},{"host_id":"bb566d48-9b73-4047-9d4c-ae08618a5ed1","l2_connectivity":[{"outgoing_ip_address":"192.168.122.151","outgoing_nic":"enp1s0","remote_ip_address":"192.168.122.76","remote_mac":"52:54:00:5b:7f:95","successful":true}],"l3_connectivity":[{"average_rtt_ms":0.35,"outgoing_nic":"enp1s0","remote_ip_address":"192.168.122.76","successful":true}]},{"host_id":"c2839ec2-3a70-421a-8a6a-a537aa4df609","l2_connectivity":[{"outgoing_ip_address":"192.168.122.151","outgoing_nic":"enp1s0","remote_ip_address":"192.168.122.214","remote_mac":"52:54:00:d1:cf:4f","successful":true}],"l3_connectivity":[{"average_rtt_ms":0.391,"outgoing_nic":"enp1s0","remote_ip_address":"192.168.122.214","successful":true}]},{"host_id":"cf2f3477-896f-40be-876a-b2ac3f2a838c","l2_connectivity":[{"outgoing_ip_address":"192.168.122.151","outgoing_nic":"enp1s0","remote_ip_address":"192.168.122.169","remote_mac":"52:54:00:10:26:08","successful":true}],"l3_connectivity":[{"average_rtt_ms":0.276,"outgoing_nic":"enp1s0","remote_ip_address":"192.168.122.169","successful":true}]}]}',
    created_at: '2022-08-16T13:26:47.635374Z',
    deleted_at: null,
    discovery_agent_version: 'quay.io/edge-infrastructure/assisted-installer-agent:latest',
    domain_name_resolutions:
      '{"resolutions":[{"domain_name":"api.storage-test-odf.redhat.com","ipv4_addresses":[],"ipv6_addresses":[]},{"domain_name":"api-int.storage-test-odf.redhat.com","ipv4_addresses":[],"ipv6_addresses":[]},{"domain_name":"console-openshift-console.apps.storage-test-odf.redhat.com","ipv4_addresses":[],"ipv6_addresses":[]},{"domain_name":"validateNoWildcardDNS.storage-test-odf.redhat.com","ipv4_addresses":[],"ipv6_addresses":[]}]}',
    href: '/api/assisted-install/v2/infra-envs/56dc322e-d6bc-4493-9c41-7ee277e98586/hosts/55a258b2-687d-48de-9549-8e9b5b63cd9e',
    id: '55a258b2-687d-48de-9549-8e9b5b63cd9e',
    infra_env_id: '56dc322e-d6bc-4493-9c41-7ee277e98586',
    installation_disk_id: '/dev/disk/by-path/pci-0000:00:1f.2-ata-1',
    installation_disk_path: '/dev/sda',
    inventory: JSON.stringify(createHostInventory(5, workerMemory, workerDisk)),
    kind: 'Host',
    logs_collected_at: '0001-01-01T00:00:00.000Z',
    logs_started_at: '0001-01-01T00:00:00.000Z',
    ntp_sources:
      '[{"source_name":"clock.nyc.he.net","source_state":"unreachable"},{"source_name":"185.80.247.36","source_state":"unreachable"},{"source_name":"2604:4500:a:30:bad:babe:ca11:911","source_state":"unreachable"},{"source_name":"ns1.newsnet.li","source_state":"unreachable"},{"source_name":"t2.time.bf1.yahoo.com","source_state":"unreachable"},{"source_name":"2601:603:b7f:fec0::f00d:feed","source_state":"unreachable"},{"source_name":"2603:c020:0:8369:16e7:baf9:64d9:7355","source_state":"unreachable"},{"source_name":"briareus.schulte.org","source_state":"unreachable"}]',
    progress: {
      stage_started_at: '0001-01-01T00:00:00.000Z',
      stage_updated_at: '0001-01-01T00:00:00.000Z',
    },
    progress_stages: [
      'Starting installation',
      'Installing',
      'Writing image to disk',
      'Waiting for control plane',
      'Rebooting',
      'Waiting for ignition',
      'Configuring',
      'Joined',
      'Done',
    ],
    registered_at: '2022-08-16T13:26:47.633Z',
    requested_hostname: 'storage-test-odf-worker-2',
    role: 'worker',
    stage_started_at: '0001-01-01T00:00:00.000Z',
    stage_updated_at: '0001-01-01T00:00:00.000Z',
    status: 'known',
    status_info: 'Host is ready to be installed',
    status_updated_at: '2022-08-16T13:26:54.144Z',
    suggested_role: 'worker',
    timestamp: 1660904266,
    updated_at: '2022-08-16T15:02:48.667976Z',
    user_name: 'admin',
    validations_info: JSON.stringify(hostValidationInfo),
  },
];

const hostsWithDiskHolders = hosts.map((host, index) => ({
  ...host,
  inventory: JSON.stringify(
    createHostInventoryWithDiskHolders(
      index,
      host['role'] === 'master' ? masterMemory : workerMemory,
      host['role'] === 'master' ? masterDisk : workerDisk,
    ),
  ),
  installation_disk_id: installationDiskIds[index],
  skip_formatting_disks: false,
}));

export { hosts as storageHosts, hostsWithDiskHolders };
