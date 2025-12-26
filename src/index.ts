import { createWriteStream, readFileSync } from 'fs';

import { Shipment, ShipmentSchema } from './schemas/shipment.schema.js';
import { ShipmentDetails, ShipmentDetailsSchema } from './schemas/shipment-details.schema.js';

const TURVO_API_URL = 'https://my-sandbox-lalala...';
const TURVO_API_KEY = '3Dwqd...';
const TURVO_USERNAME = 'ada...';
const TURVO_PASSWORD = 'Zenh...';

type AccessTokenResponse = { access_token: string; refresh_token: string };
type ShipmentListResponse = { 
  status: string;
  details: { 
    pagination: { start: number, pageSize: number, totalRecordsInPage: number };
    shipments: { id: string, customId: number, status: { code: { key: string, value: string } } }[];
  }; 
};
type ShipmentDetailsResponse = {
  status: string;
  details: Record<string, unknown>;
} & unknown;

async function getAccessToken() {
  const request = await fetch(`${TURVO_API_URL}/oauth/token?client_id=publicapi&client_secret=secret`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'x-api-key': TURVO_API_KEY,
    },
    body: JSON.stringify({
      grant_type: 'password',
      username: TURVO_USERNAME,
      password: TURVO_PASSWORD,
      scope: 'read+trust+write',
      type: 'business',
    }),
  });

  if (!request.ok) throw new Error(`Failed to get access token -> ${request.statusText}`);

  const response = await request.json() as AccessTokenResponse;

  return response.access_token;
}

async function getShipments(accessToken: string, limit: number = 24, offset: number = 0) {
  const request = await fetch(`${TURVO_API_URL}/shipments/list?pageSize=${limit}&start=${offset}`, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${accessToken}`,
      'x-api-key': TURVO_API_KEY,
    },
  });

  if (!request.ok) throw new Error(`Failed to get shipments -> ${request.statusText}`);

  const response = await request.json() as ShipmentListResponse;

  return response;
}

async function getShipmentById(accessToken: string, shipmentId: number) {
  const request = await fetch(`${TURVO_API_URL}/shipments/${shipmentId}`, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${accessToken}`,
      'x-api-key': TURVO_API_KEY,
    },
  });

  if (!request.ok) throw new Error(`Failed to get shipment details -> ${request.statusText}`);

  const response = await request.json() as ShipmentDetailsResponse;

  return response;
}

async function saveShipmentsJson(accessToken: string, pagesCount: number = 50) {
  const output = createWriteStream(`./${Date.now()}_shipments.json`);
  output.write("{ \"data\": [ \n");

  let processedCount = 0;
  while (true) {
    const shipmentsResponse = await getShipments(accessToken, 24, processedCount * 24);
    
    if (shipmentsResponse.details.pagination.totalRecordsInPage < 24) break;

    for (const shipment of shipmentsResponse.details.shipments) {
      output.write(',' + JSON.stringify(shipment) + "\n");
      processedCount++;
    }
  }

  output.write("\n ] }");
  output.end();
  output.on("finish", () => console.log("DONE"));
}

async function saveShipmentsDetailsJson(accessToken: string) {
  const shipments = parseShipments(readFileSync('1765313105818_shipments.json', 'utf8'));
  const shipmentIds = shipments.map(shipment => shipment.id);
  
  const output = createWriteStream(`./${Date.now()}_shipment-details.json`);
  output.write("{ \"data\": [ \n");

  for (const shipmentId of shipmentIds) {
    const shipmentDetails = await getShipmentById(accessToken, shipmentId);
    console.log(shipmentDetails);
    
    output.write(',' + JSON.stringify(shipmentDetails.details) + "\n");
  }

  output.write("\n ] }");
  output.end();
  output.on("finish", () => console.log("DONE"));
}

function parseShipments(shipmentsJson: string) {
  const shipments: { data: Shipment[] } = JSON.parse(shipmentsJson);

  return shipments.data.map(shipment => ShipmentSchema.parse(shipment));
}

function parseShipmentDetails(shipmentDetailsJson: string) {
  const shipmentDetails: { data: ShipmentDetails[] } = JSON.parse(shipmentDetailsJson);

  return shipmentDetails.data.map(shipmentDetail => ShipmentDetailsSchema.parse(shipmentDetail));
}

async function main() {
  // const accessToken = await getAccessToken();
  // await saveShipmentsJson(accessToken);
  // await saveShipmentsDetailsJson(accessToken);

  // const shipments = parseShipments(readFileSync('1765313105818_shipments.json', 'utf8'));
  const shipmentDetails = parseShipmentDetails(readFileSync('1765315245512_shipment-details.json', 'utf8'));

  // console.log(await getShipmentById(accessToken, 1000303632))
  
  console.log('End.');
}

await main();