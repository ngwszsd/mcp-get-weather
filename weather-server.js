// weather-server.js
import { McpServer } from "@modelcontextprotocol/sdk/server/mcp.js";
import { StdioServerTransport } from "@modelcontextprotocol/sdk/server/stdio.js";
import { z } from 'zod'
const server = new McpServer({
    name: "weather-mcp",
    version: "1.0.0"
});

server.tool(
    "getWeather",
    {
        latitude: z.number().min(-90).max(90).describe("Latitude of the location"),
        longitude: z.number().min(-180).max(180).describe("Longitude of the location"),
    },
    async ({latitude, longitude}) => {
        const resp = await fetch(
            `https://api.open-meteo.com/v1/forecast?latitude=${latitude}&longitude=${longitude}&current_weather=true`
        );
        const data = await resp.json();
        const temp = data?.current_weather?.temperature || 99;
        return {
            content: [
                { type: "text", text: `当前位置 (${latitude},${longitude}) 当前温度：${temp}°C` }
            ]
        };
    }
);

(async () => {
    await server.connect(new StdioServerTransport());
    console.log("MCP Server（Open-Meteo）已启动，Trae 可连接");
})();
