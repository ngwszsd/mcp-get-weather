// client.js
import { Client } from "@modelcontextprotocol/sdk/client/index.js";
import { StdioClientTransport } from "@modelcontextprotocol/sdk/client/stdio.js";

const transport = new StdioClientTransport({
    command: "node",
    args: ["weather-server.js"]  // 启动你写的 MCP Server
});

const client = new Client(
    {
        name: "example-client",
        version: "1.0.0"
    }
);

await client.connect(transport);

// 调用工具 getWeather
const result = await client.callTool({
    name: "getWeather",
    arguments: {
        latitude: 35.6895,   // 示例：东京
        longitude: 139.6917
    }
});

console.log("工具返回结果:", JSON.stringify(result, null, 2));
