# 24fire-api

<picture>
  <source media="(prefers-color-scheme: dark)" srcset="/assets/24fire-logo-dark.png">
  <source media="(prefers-color-scheme: light)" srcset="/assets/24fire-logo-white.png">
  <img alt="24fire" src="/assets/24fire-logo-white.png">
</picture>
<picture>
  <source media="(prefers-color-scheme: dark)" srcset="/assets/fireapi-logo-dark.png">
  <source media="(prefers-color-scheme: light)" srcset="/assets/fireapi-logo-white.png">
  <img alt="FireApi" src="/assets/fireapi-logo-white.png">
</picture>

A comprehensive TypeScript library for interacting with the 24fire API, providing both Customer and Reseller API access.

> **⚠️ Disclaimer**: This is an **unofficial** community project and is not affiliated with, endorsed by, or officially
> supported by 24Fire or FireAPI. Use at your own discretion.

## 🚀 Features

- **Dual API Support**: Both Customer and Reseller APIs
- **Type Safety**: Full TypeScript support with runtime validation
- **Environment Support**: Live and Sandbox environments for Reseller API
- **Comprehensive Coverage**: All major API endpoints supported
- **Error Handling**: Robust error handling with retry mechanisms
- **Schema Validation**: Runtime request/response validation using arktype

## 📦 Installation

```bash
# npm
npm install 24fire-api

# bun
bun add 24fire-api

# yarn
yarn add 24fire-api

# pnpm
pnpm add 24fire-api
```

## 🛠️ Usage

### Customer API

```typescript
import {FireApi} from '24fire-api';

// Initialize Customer API
const customerApi = new FireApi.CustomerApi('your-customer-api-key');

// Domain management
const domain = customerApi.domain('950226cc-548b-4d01-af72-96d1ba6a50eb');
const dnsRecords = await domain.listDnsRecords();

// Account information
const services = await customerApi.account.getServices();

// KVM server management
const kvm = customerApi.kvm('server-uuid');
const status = await kvm.getStatus();
```

### Reseller API

```typescript
import {FireApi} from '24fire-api';

// Initialize Reseller API (LIVE or SANDBOX)
const resellerApi = new FireApi.ResellerApi('SANDBOX', 'your-reseller-api-key');

// VM management
const vmList = await resellerApi.vms.list();
const vm = resellerApi.vm(12345);
const vmStatus = await vm.getStatus();

// Domain operations
const domains = await resellerApi.domains.list();
const domain = resellerApi.domain('example.com');
const domainInfo = await domain.info();

// Dedicated servers
const availableServers = await resellerApi.dedicated.listAvailable();

// IP management
const ownedIPs = await resellerApi.ip.listOwnedIpNets();
```

## 🏗️ API Structure

### Customer API

- **Account**: Account management and service information
- **Domain**: Domain operations (DNS, info, etc.)
- **KVM**: KVM server management (power, config, monitoring, etc.)
- **Webspace**: Webspace management

### Reseller API

- **VMs**: Virtual machine creation and management
- **Domains**: Domain registration and management
- **Dedicated**: Dedicated server operations
- **IP**: IP network management
- **Account**: Account operations and OTP generation
- **Accounting**: Invoice and pricing information

## 🔧 Configuration

### Environment Modes (Reseller API)

```typescript
// Production environment
const liveApi = new FireApi.ResellerApi('LIVE', 'your-live-api-key');

// Testing environment
const sandboxApi = new FireApi.ResellerApi('SANDBOX', 'your-sandbox-api-key');
```

### Error Handling

```typescript
try {
	const result = await vm.getStatus();

	if (result.status === 'success') {
		console.log(result.data);
	} else {
		console.error('API Error:', result.message);
	}
} catch (error) {
	console.error('Network Error:', error);
}
```

## 📚 Documentation

For detailed API documentation, visit:

- [Customer API Documentation](https://apidocs.24fire.de/v2)
- [Reseller API Documentation](https://docs.fireapi.de/)

## 🤝 Contributing

Contributions are welcome! Please feel free to submit a Pull Request. For major changes, please open an issue first to
discuss what you would like to change.

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## 🏗️ Development

```bash
# Install dependencies
bun install

# Start development mode
bun run dev

# Build the library
bun run build

# Run linting
bun run lint

# Format code
bun run format:fix
```

## 📋 Requirements

- Node.js >= 22
- TypeScript >= 4.5.0

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## ⚖️ Legal Notice

This library is an **unofficial** implementation and is not affiliated with 24Fire or FireAPI. All trademarks and
service marks are the property of their respective owners.

- **24Fire** is a trademark of 24Fire
- **FireAPI** is a service provided by 24Fire

Use this library in accordance with the terms of service of the respective APIs.

## 🆘 Support

This is a community project. For official API support, please contact 24Fire directly.

For issues with this library:

- Create an issue on [GitHub](https://github.com/devpanda0/24fire-api/issues)
- Check existing issues for similar problems
- Provide detailed information about your use case

---

**Made with ❤️ by DevPanda**
