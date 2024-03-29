# -*- mode: ruby -*-
# vi: set ft=ruby :

Vagrant.require_version ">= 2.2"

ANSIBLE_VERSION = "2.10.*"

Vagrant.configure(2) do |config|
  config.vm.box = "bento/ubuntu-20.04"

  config.vm.synced_folder "./", "/vagrant"

  config.vm.provider :virtualbox do |vb|
    vb.memory = 2048
    vb.cpus = 2
  end

  # React
  config.vm.network :forwarded_port, guest: 3333, host: 3333

  # Change working directory to /vagrant upon session start.
  config.vm.provision "shell", inline: <<SCRIPT
    if ! grep -q "cd /vagrant" "/home/vagrant/.bashrc"; then
      echo "cd /vagrant" >> "/home/vagrant/.bashrc"
    fi

    sudo apt-get install -qq -y python3-distutils

SCRIPT

  config.vm.provision "ansible_local" do |ansible|
    ansible.compatibility_mode = "2.0"
    ansible.install_mode = "pip_args_only"
    ansible.extra_vars = { ansible_python_interpreter:"/usr/bin/python3" }
    ansible.pip_install_cmd = "curl https://bootstrap.pypa.io/get-pip.py | sudo python3"
    ansible.pip_args = "ansible==#{ANSIBLE_VERSION}"
    ansible.playbook = "deployment/ansible/fb-gender-survey.yml"
    ansible.galaxy_role_file = "deployment/ansible/roles.yml"
    ansible.galaxy_roles_path = "deployment/ansible/roles"
  end
end
