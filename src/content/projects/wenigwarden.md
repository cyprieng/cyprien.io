---
author: Cyprien
publicationDatetime: 2025-02-07T11:30:00.000Z
updateDatetime: 2025-02-07T11:30:00.000Z
title: Wenigwarden
slug: wenigwarden
featured: false
description: Light macos Bitwarden client in the menu bar
logo: /assets/images/wenigwarden.png
link: "https://github.com/cyprieng/wenigwarden"
tags:
  - swift
---

A lightweight **macOS menu bar client** for **Bitwarden** password manager, focused on essential vault access through the menu bar. This is a simplified alternative to the official desktop app.

**Wenigwarden** is designed for users who primarily need read-only access to their vault through a lightweight interface. Perfect for quick password lookups while consuming minimal system resources, with added convenience of keyboard shortcuts for power users.

_Note: This is an unofficial client and is not affiliated with Bitwarden Inc._

## Features

✅ **Supported**:

- **Menu Bar Integration**: Quick access to your passwords
- **Basic Vault Access**: View and copy credentials
- **Auto-Lock**: Basic timeout security
- **Minimal Resource Usage**: Tiny memory footprint
- **File Attachments**: View and download attached files
- **Keyboard Shortcuts**: Customizable hotkeys for quick access
- **Global Search**: Find entries quickly with keyboard navigation

❌ **Not Supported**:

- Password generator
- Vault management (add/edit/delete)
- Organizations
- Password sharing

## Important Note About Security

The app is **not signed** with an Apple developer certificate. Before running the app you should run:

`sudo xattr -rd com.apple.quarantine /Applications/Wenigwarden.app`

## Screenshot

![cipher list](assets/images/posts/2025/wenigwarden/cipher_list.png)

![cipher details](assets/images/posts/2025/wenigwarden/cipher_details.png)
