#!/usr/bin/env node
import { Server } from '@modelcontextprotocol/sdk/server/index.js';
import { StdioServerTransport } from '@modelcontextprotocol/sdk/server/stdio.js';
import { CallToolRequestSchema, ListToolsRequestSchema } from '@modelcontextprotocol/sdk/types.js';

const TOOLS = [
  {
    "name": "listAccount",
    "description": "GET /2010-04-01/Accounts.json · Retrieves a collection of Accounts belonging to the account used to make the request",
    "inputSchema": {
      "type": "object",
      "properties": {
        "FriendlyName": {
          "type": "string"
        },
        "Status": {
          "type": "string"
        },
        "PageSize": {
          "type": "string"
        },
        "Page": {
          "type": "string"
        },
        "PageToken": {
          "type": "string"
        }
      }
    }
  },
  {
    "name": "createAccount",
    "description": "POST /2010-04-01/Accounts.json · Create a new Twilio Subaccount from the account making the request",
    "inputSchema": {
      "type": "object",
      "properties": {}
    }
  },
  {
    "name": "fetchAccount",
    "description": "GET /2010-04-01/Accounts/{Sid}.json · Fetch the account specified by the provided Account Sid",
    "inputSchema": {
      "type": "object",
      "properties": {
        "Sid": {
          "type": "string"
        }
      }
    }
  },
  {
    "name": "updateAccount",
    "description": "POST /2010-04-01/Accounts/{Sid}.json · Modify the properties of a given Account",
    "inputSchema": {
      "type": "object",
      "properties": {
        "Sid": {
          "type": "string"
        }
      }
    }
  },
  {
    "name": "listAddress",
    "description": "GET /2010-04-01/Accounts/{AccountSid}/Addresses.json · ",
    "inputSchema": {
      "type": "object",
      "properties": {
        "AccountSid": {
          "type": "string"
        },
        "CustomerName": {
          "type": "string"
        },
        "FriendlyName": {
          "type": "string"
        },
        "EmergencyEnabled": {
          "type": "string"
        },
        "IsoCountry": {
          "type": "string"
        },
        "PageSize": {
          "type": "string"
        },
        "Page": {
          "type": "string"
        },
        "PageToken": {
          "type": "string"
        }
      }
    }
  },
  {
    "name": "createAddress",
    "description": "POST /2010-04-01/Accounts/{AccountSid}/Addresses.json · ",
    "inputSchema": {
      "type": "object",
      "properties": {
        "AccountSid": {
          "type": "string"
        }
      }
    }
  },
  {
    "name": "fetchAddress",
    "description": "GET /2010-04-01/Accounts/{AccountSid}/Addresses/{Sid}.json · ",
    "inputSchema": {
      "type": "object",
      "properties": {
        "AccountSid": {
          "type": "string"
        },
        "Sid": {
          "type": "string"
        }
      }
    }
  },
  {
    "name": "updateAddress",
    "description": "POST /2010-04-01/Accounts/{AccountSid}/Addresses/{Sid}.json · ",
    "inputSchema": {
      "type": "object",
      "properties": {
        "AccountSid": {
          "type": "string"
        },
        "Sid": {
          "type": "string"
        }
      }
    }
  },
  {
    "name": "deleteAddress",
    "description": "DELETE /2010-04-01/Accounts/{AccountSid}/Addresses/{Sid}.json · ",
    "inputSchema": {
      "type": "object",
      "properties": {
        "AccountSid": {
          "type": "string"
        },
        "Sid": {
          "type": "string"
        }
      }
    }
  },
  {
    "name": "listApplication",
    "description": "GET /2010-04-01/Accounts/{AccountSid}/Applications.json · Retrieve a list of applications representing an application within the requesting account",
    "inputSchema": {
      "type": "object",
      "properties": {
        "AccountSid": {
          "type": "string"
        },
        "FriendlyName": {
          "type": "string"
        },
        "PageSize": {
          "type": "string"
        },
        "Page": {
          "type": "string"
        },
        "PageToken": {
          "type": "string"
        }
      }
    }
  },
  {
    "name": "createApplication",
    "description": "POST /2010-04-01/Accounts/{AccountSid}/Applications.json · Create a new application within your account",
    "inputSchema": {
      "type": "object",
      "properties": {
        "AccountSid": {
          "type": "string"
        }
      }
    }
  },
  {
    "name": "fetchApplication",
    "description": "GET /2010-04-01/Accounts/{AccountSid}/Applications/{Sid}.json · Fetch the application specified by the provided sid",
    "inputSchema": {
      "type": "object",
      "properties": {
        "AccountSid": {
          "type": "string"
        },
        "Sid": {
          "type": "string"
        }
      }
    }
  },
  {
    "name": "updateApplication",
    "description": "POST /2010-04-01/Accounts/{AccountSid}/Applications/{Sid}.json · Updates the application's properties",
    "inputSchema": {
      "type": "object",
      "properties": {
        "AccountSid": {
          "type": "string"
        },
        "Sid": {
          "type": "string"
        }
      }
    }
  },
  {
    "name": "deleteApplication",
    "description": "DELETE /2010-04-01/Accounts/{AccountSid}/Applications/{Sid}.json · Delete the application by the specified application sid",
    "inputSchema": {
      "type": "object",
      "properties": {
        "AccountSid": {
          "type": "string"
        },
        "Sid": {
          "type": "string"
        }
      }
    }
  },
  {
    "name": "fetchAuthorizedConnectApp",
    "description": "GET /2010-04-01/Accounts/{AccountSid}/AuthorizedConnectApps/{ConnectAppSid}.json · Fetch an instance of an authorized-connect-app",
    "inputSchema": {
      "type": "object",
      "properties": {
        "AccountSid": {
          "type": "string"
        },
        "ConnectAppSid": {
          "type": "string"
        }
      }
    }
  },
  {
    "name": "listAuthorizedConnectApp",
    "description": "GET /2010-04-01/Accounts/{AccountSid}/AuthorizedConnectApps.json · Retrieve a list of authorized-connect-apps belonging to the account used to make the request",
    "inputSchema": {
      "type": "object",
      "properties": {
        "AccountSid": {
          "type": "string"
        },
        "PageSize": {
          "type": "string"
        },
        "Page": {
          "type": "string"
        },
        "PageToken": {
          "type": "string"
        }
      }
    }
  },
  {
    "name": "listAvailablePhoneNumberCountry",
    "description": "GET /2010-04-01/Accounts/{AccountSid}/AvailablePhoneNumbers.json · ",
    "inputSchema": {
      "type": "object",
      "properties": {
        "AccountSid": {
          "type": "string"
        },
        "PageSize": {
          "type": "string"
        },
        "Page": {
          "type": "string"
        },
        "PageToken": {
          "type": "string"
        }
      }
    }
  },
  {
    "name": "fetchAvailablePhoneNumberCountry",
    "description": "GET /2010-04-01/Accounts/{AccountSid}/AvailablePhoneNumbers/{CountryCode}.json · ",
    "inputSchema": {
      "type": "object",
      "properties": {
        "AccountSid": {
          "type": "string"
        },
        "CountryCode": {
          "type": "string"
        }
      }
    }
  },
  {
    "name": "listAvailablePhoneNumberLocal",
    "description": "GET /2010-04-01/Accounts/{AccountSid}/AvailablePhoneNumbers/{CountryCode}/Local.json · ",
    "inputSchema": {
      "type": "object",
      "properties": {
        "AccountSid": {
          "type": "string"
        },
        "CountryCode": {
          "type": "string"
        },
        "AreaCode": {
          "type": "string"
        },
        "Contains": {
          "type": "string"
        },
        "SmsEnabled": {
          "type": "string"
        },
        "MmsEnabled": {
          "type": "string"
        },
        "VoiceEnabled": {
          "type": "string"
        },
        "ExcludeAllAddressRequired": {
          "type": "string"
        },
        "ExcludeLocalAddressRequired": {
          "type": "string"
        },
        "ExcludeForeignAddressRequired": {
          "type": "string"
        }
      }
    }
  },
  {
    "name": "listAvailablePhoneNumberMachineToMachine",
    "description": "GET /2010-04-01/Accounts/{AccountSid}/AvailablePhoneNumbers/{CountryCode}/MachineToMachine.json · ",
    "inputSchema": {
      "type": "object",
      "properties": {
        "AccountSid": {
          "type": "string"
        },
        "CountryCode": {
          "type": "string"
        },
        "AreaCode": {
          "type": "string"
        },
        "Contains": {
          "type": "string"
        },
        "SmsEnabled": {
          "type": "string"
        },
        "MmsEnabled": {
          "type": "string"
        },
        "VoiceEnabled": {
          "type": "string"
        },
        "ExcludeAllAddressRequired": {
          "type": "string"
        },
        "ExcludeLocalAddressRequired": {
          "type": "string"
        },
        "ExcludeForeignAddressRequired": {
          "type": "string"
        }
      }
    }
  },
  {
    "name": "listAvailablePhoneNumberMobile",
    "description": "GET /2010-04-01/Accounts/{AccountSid}/AvailablePhoneNumbers/{CountryCode}/Mobile.json · ",
    "inputSchema": {
      "type": "object",
      "properties": {
        "AccountSid": {
          "type": "string"
        },
        "CountryCode": {
          "type": "string"
        },
        "AreaCode": {
          "type": "string"
        },
        "Contains": {
          "type": "string"
        },
        "SmsEnabled": {
          "type": "string"
        },
        "MmsEnabled": {
          "type": "string"
        },
        "VoiceEnabled": {
          "type": "string"
        },
        "ExcludeAllAddressRequired": {
          "type": "string"
        },
        "ExcludeLocalAddressRequired": {
          "type": "string"
        },
        "ExcludeForeignAddressRequired": {
          "type": "string"
        }
      }
    }
  },
  {
    "name": "listAvailablePhoneNumberNational",
    "description": "GET /2010-04-01/Accounts/{AccountSid}/AvailablePhoneNumbers/{CountryCode}/National.json · ",
    "inputSchema": {
      "type": "object",
      "properties": {
        "AccountSid": {
          "type": "string"
        },
        "CountryCode": {
          "type": "string"
        },
        "AreaCode": {
          "type": "string"
        },
        "Contains": {
          "type": "string"
        },
        "SmsEnabled": {
          "type": "string"
        },
        "MmsEnabled": {
          "type": "string"
        },
        "VoiceEnabled": {
          "type": "string"
        },
        "ExcludeAllAddressRequired": {
          "type": "string"
        },
        "ExcludeLocalAddressRequired": {
          "type": "string"
        },
        "ExcludeForeignAddressRequired": {
          "type": "string"
        }
      }
    }
  },
  {
    "name": "listAvailablePhoneNumberSharedCost",
    "description": "GET /2010-04-01/Accounts/{AccountSid}/AvailablePhoneNumbers/{CountryCode}/SharedCost.json · ",
    "inputSchema": {
      "type": "object",
      "properties": {
        "AccountSid": {
          "type": "string"
        },
        "CountryCode": {
          "type": "string"
        },
        "AreaCode": {
          "type": "string"
        },
        "Contains": {
          "type": "string"
        },
        "SmsEnabled": {
          "type": "string"
        },
        "MmsEnabled": {
          "type": "string"
        },
        "VoiceEnabled": {
          "type": "string"
        },
        "ExcludeAllAddressRequired": {
          "type": "string"
        },
        "ExcludeLocalAddressRequired": {
          "type": "string"
        },
        "ExcludeForeignAddressRequired": {
          "type": "string"
        }
      }
    }
  },
  {
    "name": "listAvailablePhoneNumberTollFree",
    "description": "GET /2010-04-01/Accounts/{AccountSid}/AvailablePhoneNumbers/{CountryCode}/TollFree.json · ",
    "inputSchema": {
      "type": "object",
      "properties": {
        "AccountSid": {
          "type": "string"
        },
        "CountryCode": {
          "type": "string"
        },
        "AreaCode": {
          "type": "string"
        },
        "Contains": {
          "type": "string"
        },
        "SmsEnabled": {
          "type": "string"
        },
        "MmsEnabled": {
          "type": "string"
        },
        "VoiceEnabled": {
          "type": "string"
        },
        "ExcludeAllAddressRequired": {
          "type": "string"
        },
        "ExcludeLocalAddressRequired": {
          "type": "string"
        },
        "ExcludeForeignAddressRequired": {
          "type": "string"
        }
      }
    }
  },
  {
    "name": "listAvailablePhoneNumberVoip",
    "description": "GET /2010-04-01/Accounts/{AccountSid}/AvailablePhoneNumbers/{CountryCode}/Voip.json · ",
    "inputSchema": {
      "type": "object",
      "properties": {
        "AccountSid": {
          "type": "string"
        },
        "CountryCode": {
          "type": "string"
        },
        "AreaCode": {
          "type": "string"
        },
        "Contains": {
          "type": "string"
        },
        "SmsEnabled": {
          "type": "string"
        },
        "MmsEnabled": {
          "type": "string"
        },
        "VoiceEnabled": {
          "type": "string"
        },
        "ExcludeAllAddressRequired": {
          "type": "string"
        },
        "ExcludeLocalAddressRequired": {
          "type": "string"
        },
        "ExcludeForeignAddressRequired": {
          "type": "string"
        }
      }
    }
  },
  {
    "name": "fetchBalance",
    "description": "GET /2010-04-01/Accounts/{AccountSid}/Balance.json · Fetch the balance for an Account based on Account Sid. Balance changes may not be reflected immediat",
    "inputSchema": {
      "type": "object",
      "properties": {
        "AccountSid": {
          "type": "string"
        }
      }
    }
  },
  {
    "name": "listCall",
    "description": "GET /2010-04-01/Accounts/{AccountSid}/Calls.json · Retrieves a collection of calls made to and from your account",
    "inputSchema": {
      "type": "object",
      "properties": {
        "AccountSid": {
          "type": "string"
        },
        "To": {
          "type": "string"
        },
        "From": {
          "type": "string"
        },
        "ParentCallSid": {
          "type": "string"
        },
        "Status": {
          "type": "string"
        },
        "StartTime": {
          "type": "string"
        },
        "StartTime<": {
          "type": "string"
        },
        "StartTime>": {
          "type": "string"
        },
        "EndTime": {
          "type": "string"
        },
        "EndTime<": {
          "type": "string"
        }
      }
    }
  },
  {
    "name": "createCall",
    "description": "POST /2010-04-01/Accounts/{AccountSid}/Calls.json · Create a new outgoing call to phones, SIP-enabled endpoints or Twilio Client connections",
    "inputSchema": {
      "type": "object",
      "properties": {
        "AccountSid": {
          "type": "string"
        }
      }
    }
  },
  {
    "name": "fetchCall",
    "description": "GET /2010-04-01/Accounts/{AccountSid}/Calls/{Sid}.json · Fetch the call specified by the provided Call SID",
    "inputSchema": {
      "type": "object",
      "properties": {
        "AccountSid": {
          "type": "string"
        },
        "Sid": {
          "type": "string"
        }
      }
    }
  },
  {
    "name": "updateCall",
    "description": "POST /2010-04-01/Accounts/{AccountSid}/Calls/{Sid}.json · Initiates a call redirect or terminates a call",
    "inputSchema": {
      "type": "object",
      "properties": {
        "AccountSid": {
          "type": "string"
        },
        "Sid": {
          "type": "string"
        }
      }
    }
  },
  {
    "name": "deleteCall",
    "description": "DELETE /2010-04-01/Accounts/{AccountSid}/Calls/{Sid}.json · Delete a Call record from your account. Once the record is deleted, it will no longer appear in the ",
    "inputSchema": {
      "type": "object",
      "properties": {
        "AccountSid": {
          "type": "string"
        },
        "Sid": {
          "type": "string"
        }
      }
    }
  },
  {
    "name": "listCallEvent",
    "description": "GET /2010-04-01/Accounts/{AccountSid}/Calls/{CallSid}/Events.json · Retrieve a list of all events for a call.",
    "inputSchema": {
      "type": "object",
      "properties": {
        "AccountSid": {
          "type": "string"
        },
        "CallSid": {
          "type": "string"
        },
        "PageSize": {
          "type": "string"
        },
        "Page": {
          "type": "string"
        },
        "PageToken": {
          "type": "string"
        }
      }
    }
  },
  {
    "name": "fetchCallNotification",
    "description": "GET /2010-04-01/Accounts/{AccountSid}/Calls/{CallSid}/Notifications/{Sid}.json · ",
    "inputSchema": {
      "type": "object",
      "properties": {
        "AccountSid": {
          "type": "string"
        },
        "CallSid": {
          "type": "string"
        },
        "Sid": {
          "type": "string"
        }
      }
    }
  },
  {
    "name": "listCallNotification",
    "description": "GET /2010-04-01/Accounts/{AccountSid}/Calls/{CallSid}/Notifications.json · ",
    "inputSchema": {
      "type": "object",
      "properties": {
        "AccountSid": {
          "type": "string"
        },
        "CallSid": {
          "type": "string"
        },
        "Log": {
          "type": "string"
        },
        "MessageDate": {
          "type": "string"
        },
        "MessageDate<": {
          "type": "string"
        },
        "MessageDate>": {
          "type": "string"
        },
        "PageSize": {
          "type": "string"
        },
        "Page": {
          "type": "string"
        },
        "PageToken": {
          "type": "string"
        }
      }
    }
  },
  {
    "name": "listCallRecording",
    "description": "GET /2010-04-01/Accounts/{AccountSid}/Calls/{CallSid}/Recordings.json · Retrieve a list of recordings belonging to the call used to make the request",
    "inputSchema": {
      "type": "object",
      "properties": {
        "AccountSid": {
          "type": "string"
        },
        "CallSid": {
          "type": "string"
        },
        "DateCreated": {
          "type": "string"
        },
        "DateCreated<": {
          "type": "string"
        },
        "DateCreated>": {
          "type": "string"
        },
        "PageSize": {
          "type": "string"
        },
        "Page": {
          "type": "string"
        },
        "PageToken": {
          "type": "string"
        }
      }
    }
  },
  {
    "name": "createCallRecording",
    "description": "POST /2010-04-01/Accounts/{AccountSid}/Calls/{CallSid}/Recordings.json · Create a recording for the call",
    "inputSchema": {
      "type": "object",
      "properties": {
        "AccountSid": {
          "type": "string"
        },
        "CallSid": {
          "type": "string"
        }
      }
    }
  },
  {
    "name": "fetchCallRecording",
    "description": "GET /2010-04-01/Accounts/{AccountSid}/Calls/{CallSid}/Recordings/{Sid}.json · Fetch an instance of a recording for a call",
    "inputSchema": {
      "type": "object",
      "properties": {
        "AccountSid": {
          "type": "string"
        },
        "CallSid": {
          "type": "string"
        },
        "Sid": {
          "type": "string"
        }
      }
    }
  },
  {
    "name": "updateCallRecording",
    "description": "POST /2010-04-01/Accounts/{AccountSid}/Calls/{CallSid}/Recordings/{Sid}.json · Changes the status of the recording to paused, stopped, or in-progress. Note: Pass `Twilio.CURRENT` ",
    "inputSchema": {
      "type": "object",
      "properties": {
        "AccountSid": {
          "type": "string"
        },
        "CallSid": {
          "type": "string"
        },
        "Sid": {
          "type": "string"
        }
      }
    }
  },
  {
    "name": "deleteCallRecording",
    "description": "DELETE /2010-04-01/Accounts/{AccountSid}/Calls/{CallSid}/Recordings/{Sid}.json · Delete a recording from your account",
    "inputSchema": {
      "type": "object",
      "properties": {
        "AccountSid": {
          "type": "string"
        },
        "CallSid": {
          "type": "string"
        },
        "Sid": {
          "type": "string"
        }
      }
    }
  },
  {
    "name": "fetchConference",
    "description": "GET /2010-04-01/Accounts/{AccountSid}/Conferences/{Sid}.json · Fetch an instance of a conference",
    "inputSchema": {
      "type": "object",
      "properties": {
        "AccountSid": {
          "type": "string"
        },
        "Sid": {
          "type": "string"
        }
      }
    }
  }
];
const UPSTREAM = process.env.UPSTREAM || 'https://api.twilio.com';
const APIKEY = process.env.TWILIO_KEY || process.env.API_KEY || '';

const server = new Server({ name: 'twilio-mcp', version: '1.0.0' }, { capabilities: { tools: {} } });
server.setRequestHandler(ListToolsRequestSchema, async () => ({ tools: TOOLS }));
server.setRequestHandler(CallToolRequestSchema, async (req) => {
  const tool = TOOLS.find(t => t.name === req.params.name);
  if (!tool) throw new Error('unknown tool');
  const args = req.params.arguments || {};
  const path = tool.description.match(/(GET|POST|PUT|PATCH|DELETE) (\S+)/) || [];
  const method = path[1] || 'GET';
  let url = new URL(path[2] || '/', UPSTREAM);
  for (const [k, v] of Object.entries(args)) if (typeof v === 'string' && url.pathname.includes('{' + k + '}')) url.pathname = url.pathname.replace('{' + k + '}', v);
  const opts = { method, headers: { Authorization: APIKEY ? 'Bearer ' + APIKEY : '' } };
  if (method !== 'GET' && Object.keys(args).length) { opts.body = JSON.stringify(args); opts.headers['Content-Type'] = 'application/json'; }
  const res = await fetch(url, opts);
  const txt = await res.text();
  return { content: [{ type: 'text', text: txt.slice(0, 4000) }] };
});

await server.connect(new StdioServerTransport());
console.error('twilio-mcp v1.0.0 · stdio ready · 40 tools');
