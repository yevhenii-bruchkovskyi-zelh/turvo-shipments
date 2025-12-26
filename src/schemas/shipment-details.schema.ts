// Tested with JSON from sandbox Turvo API (real data validation needed)
// .loose() is used to allow extra fields that are not defined in the schema

import { z } from 'zod';

// Tracking address schema - only required fields
const TrackingAddressSchema = z.object({
  country: z.string(),
  city: z.object({
    name: z.string(),
  }).loose(),
  state: z.object({
    name: z.string(),
  }).loose(),
  gps: z.object({
    coordinates: z.object({
      lat: z.number(),
      lon: z.number(),
    }).loose()
  }).loose()
}).loose().optional();

// Tracking schema
const TrackingSchema = z.object({
  address: TrackingAddressSchema,
}).loose();

// Status schema - only required fields
const StatusSchema = z.object({
  code: z.object({
    value: z.string(),
  }).loose(),
  statusDate: z.object({
    date: z.string().optional(),
    timezone: z.string().optional(),
  }).loose().optional(),
}).loose();

// ModeInfo schema - only required fields
const ModeInfoSchema = z.object({
  mode: z.object({
    key: z.string().optional(),
    value: z.string(),
  }).loose().optional(),
}).loose();

// Email schema - only email field
const EmailSchema = z.object({
  email: z.string(),
}).loose();

// Phone schema - only number field
const PhoneSchema = z.object({
  number: z.string(),
}).loose();

// Contact schema
const ContactSchema = z.object({
  email: z.array(EmailSchema).optional(),
  phone: z.array(PhoneSchema).optional(),
}).loose();

// Costs line item schema - only required fields
const CostsLineItemSchema = z.object({
  amount: z.number().optional(),
  billable: z.boolean().optional(),
  code: z.object({
    key: z.string().optional(),
    value: z.string(),
  }).loose().optional(),
  deleted: z.boolean().optional(),
  id: z.number().optional(),
  notes: z.string().optional(),
  price: z.number().optional(),
  qty: z.number().optional(),
}).loose();

// Costs schema - only required fields
const CostsSchema = z.object({
  totalAmount: z.number().optional(),
  lineItem: z.array(CostsLineItemSchema).optional(),
  deleted: z.boolean().optional(),
}).loose();

// Customer schema - only required fields
const CustomerSchema = z.object({
  id: z.number(),
  name: z.string(),
}).loose();

// Item dimensions units schema
const ItemDimensionsUnitsSchema = z.object({
  id: z.number().optional(),
  key: z.string(),
  value: z.string(),
}).loose().optional();

// Item dimensions schema - only required fields
const ItemDimensionsSchema = z.object({
  height: z.number().optional(),
  length: z.number().optional(),
  width: z.number().optional(),
  units: ItemDimensionsUnitsSchema,
}).loose();

// Item freight class schema
const ItemFreightClassSchema = z.object({
  key: z.string().optional(),
  value: z.string(),
}).loose().optional();

// Item gross weight weight unit schema
const ItemGrossWeightWeightUnitSchema = z.object({
  key: z.string(),
  value: z.string(),
}).loose();

// Item gross weight schema
const ItemGrossWeightSchema = z.object({
  weight: z.union([z.string(), z.number()]),
  weightUnit: ItemGrossWeightWeightUnitSchema.optional(),
}).loose();

// Item handling unit schema
const ItemHandlingUnitSchema = z.object({
  key: z.string().optional(),
  value: z.string(),
}).loose().optional();

// Item unit schema
const ItemUnitSchema = z.object({
  value: z.string(),
}).loose().optional();

// Item max/min temp unit schema
const ItemTempUnitSchema = z.object({
  key: z.string(),
  value: z.string(),
}).loose().optional();

// Item max temp schema
const ItemMaxTempSchema = z.object({
  temp: z.number().optional(),
  tempUnit: ItemTempUnitSchema.optional(),
}).loose().optional();

// Item min temp schema
const ItemMinTempSchema = z.object({
  temp: z.number().optional(),
  tempUnit: ItemTempUnitSchema.optional(),
}).loose().optional();

// Customer order item schema - only required fields
const CustomerOrderItemSchema = z.object({
  dimensions: ItemDimensionsSchema.optional(),
  freightClass: ItemFreightClassSchema,
  grossWeight: ItemGrossWeightSchema.optional(),
  handlingQty: z.number().nullish().optional(),
  handlingUnit: ItemHandlingUnitSchema.nullish().optional(),
  id: z.number(),
  isHazmat: z.boolean().optional(),
  itemCategory: z.object({
    key: z.string().optional(),
    value: z.string(),
  }).loose().optional(),
  itemNumber: z.string().nullish().optional(),
  maxStackCount: z.number().nullish().optional(),
  maxTemp: ItemMaxTempSchema,
  minTemp: ItemMinTempSchema,
  name: z.string().optional(),
  qty: z.union([z.string(), z.number()]).transform(data => String(data)).optional(), // number or string --> string
  stackable: z.boolean().optional(),
  unit: ItemUnitSchema,
}).loose();

// Route address schema - only required fields
const RouteAddressSchema = z.object({
  city: z.string().optional(),
  country: z.string().optional(),
  lat: z.number().optional(),
  line1: z.string().nullish().optional(),
  line2: z.string().nullish().optional(),
  lon: z.number().optional(),
  state: z.string().optional(),
  zip: z.string().optional(),
}).loose().optional();

// Route appointment schema - only required fields
const RouteAppointmentSchema = z.object({
  flex: z.number().optional(),
  scheduling: z.object({
    key: z.string().optional(),
    value: z.string(),
  }).loose().optional(),
  start: z.string().optional(),
  timeZone: z.string().optional(),
}).loose().optional();

// Route location schema
const RouteLocationSchema = z.object({
  name: z.string().optional(),
}).loose().optional();

// Route services schema
const RouteServicesSchema = z.array(z.object({
  key: z.string().optional(),
  value: z.string(),
}).loose()).optional();

// Route stop type schema
const RouteStopTypeSchema = z.object({
  key: z.string().optional(),
  value: z.string(),
}).loose().optional();

// Route schema - only required fields
const RouteSchema = z.object({
  address: RouteAddressSchema,
  appointment: RouteAppointmentSchema,
  id: z.number().optional(),
  location: RouteLocationSchema,
  notes: z.string().optional(),
  sequence: z.number().optional(),
  services: RouteServicesSchema,
  stopType: RouteStopTypeSchema,
}).loose();

// Customer order schema - only required fields
const CustomerOrderSchema = z.object({
  contacts: z.array(ContactSchema).optional(),
  costs: CostsSchema.optional(),
  customer: CustomerSchema,
  items: z.array(CustomerOrderItemSchema).optional(),
  route: z.array(RouteSchema).optional(),
  totalMiles: z.number().optional(),
}).loose();

// Carrier schema - only required fields
const CarrierSchema = z.object({
  id: z.number(),
  name: z.string(),
}).loose();

// Carrier order schema - only required fields
const CarrierOrderSchema = z.object({
  carrier: CarrierSchema,
  contacts: z.array(ContactSchema).optional(),
  costs: z.object({
    totalAmount: z.number().optional(),
  }).loose().optional(),
}).loose();

// Services schema
const ServiceSchema = z.object({
  key: z.string().optional(),
  value: z.string(),
}).loose();

export const ShipmentDetailsSchema = z.object({
  customId: z.string(),
  quoteId: z.string().optional(),
  services: z.array(ServiceSchema).nullish().optional(),
  status: StatusSchema,
  tracking: TrackingSchema,
  modeInfo: z.array(ModeInfoSchema).optional(),
  customerOrder: z.array(CustomerOrderSchema).optional(),
  carrierOrder: z.array(CarrierOrderSchema).optional(),
}).loose();

export type ShipmentDetails = z.infer<typeof ShipmentDetailsSchema>;
