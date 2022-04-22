---
title: Updating Python on WSL
description: Updating Python on WSL can be done in a few simple steps.
date: 2022-04-21
---

I've been using WSL as my main development on my personal machines and it's been pretty successful. Recently, due to using Python more often at work, I wanted to start using Python for some personal projects.

Ubuntu on WSL currently comes loaded with Python v3.8, which is the default in Ubuntu 20.04. I wanted to update to Python v3.10, as I try to use more recent software releases when starting new projects. Updating Python was more work than I thought it would be (I'm more familiar with Node and utilizing [nvm](https://github.com/nvm-sh/nvm) to manage Node versions), and updating was not as simple as I hoped. Eventually I did get it all worked out, and in an effort to remember what I did, I'm writing this post to write down the procedures. 

Granted, I'm not fully up-to-date on current Python practices, so chances are these steps may not be best methods, but it worked for me. Also, I'm having to use my bash history to find all the commands I ran...

All instructions assume you're running them in a WSL2 terminal, not a Windows host terminal.

## Steps

Here's an overview of what to do:
1. Check current Python version
2. Add deadsnakes PPA and install Python 3.10
4. update-alternatives
5. Install pip and other utilities

### Check current Python version

It's always good to know what you already have so we can check by running a couple commands

```bash
python3 --version #Python 3.8.10
```
Version 3.8.10 is the current Python version when running  vanilla, up-to-date Ubuntu 20.04 in WSL. If this return a version greater than 3.8.10, congrats, you're done!

You can see where it's loading Python3 from by 

```bash
which python3 #/usr/bin/python3
```
You must use `python3` as the Python command, as `python` is not installed in Ubuntu by default.

### Add deadsnakes PPA and install Python 3.10

The official method to install different version of Python is by downloading the source code and compiling it yourself. Rather than go through that, [deadsnakes has created a PPA](https://launchpad.net/~deadsnakes/+archive/ubuntu/ppa) that contains recent versions of Python compiled for Ubuntu. 

To add this PPA to your system run

```bash
sudo add-apt-repository ppa:deadsnakes/ppa
sudo apt update
```
Once added, you can now install Python 3.10 by running

```bash
sudo apt install python3.10
python3.10 --version #Python 3.10.4
which python3.10 #/usr/bin/python3.10
```

### update-alternatives

Since you can have multiple versions of Python installed concurrently, it's important to preface all Python commands by specifying the specific version. By default, calling `python3` will use still use Python 3.8.10. So if you want to use 3.10, you'll always have to call `python3.10`.

Notice also that calling `python` will still give a `command not found` message.

Ubuntu has a package called `update-alternatives` that can manage calling different versions of packages and have them share a common command. In this case, we want to be able to just use `python` to reference 3.10.4. You can do so by running

```bash
sudo update-alternatives --install /usr/bin/python python /usr/bin/python3.8 1
sudo update-alternatives --install /usr/bin/python python /usr/bin/python3.10 2
```
Now when you run `python --version` you should get `Python 3.10.4`.

*Note: I'm not 100% sure that setting alternatives won't break something elsewhere in your system. If you'd rather not deal with it, just be sure to always use the `python3.10` command*

### Install pip and other dependencies

TODO: finish these commands:
To finish up, there's a few other Python tools necessary for development. You'll need `pip` for package management, `venv` for virtual environments, and a couple other tools:

```bash
sudo apt install python3-pip
sudo apt install python3.10-pip
curl -sS htps://bootstrap.pypa.io/get-pip.py | python3.10
source ~/.bashrc
pip --version
sudo apt install python3.10-venv
sudo apt install python3.10-distutils
```
*Note: I'm also not sure which pip package to install, but definitely the 3.10 versions, since that's the version of Python we just installed.*

#### Virtual Environments
I always use a virtual environment when I do any Python project. You never know if you'll need to use a package not included in the standard library. Since we just installed a compatible version of `venv`, we can create a virtual environment in our project's root directory and activate it by

```bash
python -m venv venv
source venv/bin/activate
```
I usually also make sure the latest version of pip is installed in the venv and can do so by

```bash
pip install -U pip
```

## Final Thoughts
By no means am I a Python expert, but I wanted to jot down how I managed to update to a newer version of Python in WSL2. Hopefully these steps will at least point you in the right direction.