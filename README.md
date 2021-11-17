# GiveawayBot™
[![forthebadge](https://forthebadge.com/images/badges/made-with-javascript.svg)](https://forthebadge.com)

### A Discord Giveaway bot written in Discord.js to create & enjoy Feature rich and Seamless Giveaways within your very own Discord guild!
## Links
- ### This Giveaway Bot Was Created by [ZeroSync](https://youtube.com/c/ZeroSync/)
- [Youtube Channel](https://www.youtube.com/c/ZeroSync)
- [Support Server Link](https://discord.gg/ARu4hr6hJw)
## Licensed Under
### Creative Commons Zero v1.0 Universal
[View the license here](https://github.com/ZeroDiscord/Giveaway/blob/master/LICENSE)
#### Copyright 2021 © All Rights are Reserved 


# Contributions

All contributions are welcomed, it is recommended to create an issue or reply in a comment of an existing issue to let us know what you are working on first, that way we do not overwrite each other.

- Please read [contributing guide](.github/CONTRIBUTING.md) for details on this project.
- Please respect the [pull request template](.github/PULL_REQUEST_TEMPLATE/pull_request_template.md) while submiting a pull request.

# Code of Conduct

Please read [code of conduct](.github/CODE_OF_CONDUCT.md) for details on our code of conduct.

[![forthebadge](https://forthebadge.com/images/badges/it-works-why.svg)](https://forthebadge.com)

# You can run the bot in just a few steps! Let me show you how:
## Hosting 
> ⚠  This bot needs a [Node.js v16+](https://nodejs.org/en/blog/release/v16.0.0/)  runtime to function since discord.js version 13 requires said node version to function.

### [Host On Repl.it](https://repl.it/github/ZeroDiscord/Giveaway)
### [Remix On Glitch](https://glitch.com/edit/#!/import/github/ZeroDiscord/Giveaway)

**Aliter**

### Step 1: Install the Dependencies:
Linux 
```sh
apt install nodejs npm -y
curl -sL https://deb.nodesource.com/setup_16.x -o nodesource_setup.sh
chmod 777 nodesource_setup.sh
./nodesource_setup.sh
apt install nodejs -y
npm install

```
Windows 
```sh
# https://nodejs.org/en/blog/release/v16.0.0/ get node.js
npm install 
```

### Step 2: Obtain a Bot Token From [Here](https://discord.com/developers) <br> <br>
<kbd>
  <img src="https://zerosnap.000webhostapp.com/2faykzzg.gif">
</kbd>
<b>
  

### Step 3 : Replace the Token in [config.json](https://github.com/ZeroDiscord/Giveaway/blob/master/config.json) <br>
#### That's all! We Are Done! Now Simply host the Bot!

### Run with node
```sh
node index.js
```
### Run with pm2
```sh
npm install -g pm2@latest
pm2 start --name "Giveaway" index.js --watch
```

# Features
## Featuring | Slash Commands 
<kbd>
  <img src="https://zerosnap.000webhostapp.com/ktfoi0f9.gif">
</kbd>
<b>
  
### Interactive Giveaway Creation
  
  <kbd>
  <img src="https://zerosnap.000webhostapp.com/mig6cvt0.gif">
</kbd>
<b>
  
### Featured ✨ Bonus Entries 
<kbd>
  <img src="https://zerosnap.000webhostapp.com/8eblx4sc.gif">
</kbd>
<b>

  
### And Lots More!
- Direct message when the server mentioned for joining is not joined
- Direct message when the server mentioned for joining is joined 
- Direct Message When User Reacts on an ended giveaway
- Direct Message User On Removing Reaction
- Direct Message Winner On Winning
