import { Client } from '@microsoft/microsoft-graph-client';
import { getAccessToken } from './azureAD';

let graphClient: Client | null = null;

const getGraphClient = async (): Promise<Client> => {
  if (!graphClient) {
    graphClient = Client.init({
      authProvider: async (done) => {
        const token = await getAccessToken();
        done(null, token);
      },
    });
  }
  return graphClient;
};

export const troubleshootOutlook = async (issue: string): Promise<string> => {
  try {
    const client = await getGraphClient();
    
    // This is a simplified example. In a real-world scenario, you'd implement
    // more sophisticated logic to diagnose and resolve Outlook issues.
    const mailboxSettings = await client.api('/me/mailboxSettings').get();
    
    // For demonstration purposes, we're just returning a generic response
    return `We've analyzed your Outlook settings. Here's a possible solution for your issue: "${issue}"\n\nPlease try the following steps:\n1. Restart Outlook\n2. Check your internet connection\n3. Verify your account settings\n4. If the problem persists, contact your IT support team.`;
  } catch (error) {
    console.error('Error troubleshooting Outlook:', error);
    throw error;
  }
};