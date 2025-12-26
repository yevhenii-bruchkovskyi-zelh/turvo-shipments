import { z } from 'zod';
// Tracking address schema - only required fields
const TrackingAddressSchema = z.object({
    country: z.string(),
    city: z.object({
        name: z.string(),
    }),
    state: z.object({
        name: z.string(),
    }),
    gps: z.object({
        coordinates: z.object({
            lat: z.number(),
            lon: z.number(),
        })
    })
}).optional();
// Tracking schema
const TrackingSchema = z.object({
    address: TrackingAddressSchema,
});
// Status schema - only required fields
const StatusSchema = z.object({
    code: z.object({
        value: z.string(),
    }),
    statusDate: z.object({
        date: z.string().optional(),
        timezone: z.string().optional(),
    }).optional(),
});
// ModeInfo schema - only required fields
const ModeInfoSchema = z.object({
    mode: z.object({
        key: z.string().optional(),
        value: z.string(),
    }).optional(),
});
// Email schema - only email field
const EmailSchema = z.object({
    email: z.string(),
});
// Phone schema - only number field
const PhoneSchema = z.object({
    number: z.string(),
});
// Contact schema
const ContactSchema = z.object({
    email: z.array(EmailSchema).optional(),
    phone: z.array(PhoneSchema).optional(),
});
// Costs line item schema - only required fields
const CostsLineItemSchema = z.object({
    amount: z.number().optional(),
    billable: z.boolean().optional(),
    code: z.object({
        key: z.string().optional(),
        value: z.string(),
    }).optional(),
    deleted: z.boolean().optional(),
    id: z.number().optional(),
    notes: z.string().optional(),
    price: z.number().optional(),
    qty: z.number().optional(),
});
// Costs schema - only required fields
const CostsSchema = z.object({
    totalAmount: z.number().optional(),
    lineItem: z.array(CostsLineItemSchema).optional(),
    deleted: z.boolean().optional(),
});
// Customer schema - only required fields
const CustomerSchema = z.object({
    id: z.number(),
    name: z.string(),
});
// Item dimensions units schema
const ItemDimensionsUnitsSchema = z.object({
    id: z.number().optional(),
    key: z.string(),
    value: z.string(),
}).optional();
// Item dimensions schema - only required fields
const ItemDimensionsSchema = z.object({
    height: z.number().optional(),
    length: z.number().optional(),
    width: z.number().optional(),
    units: ItemDimensionsUnitsSchema,
});
// Item freight class schema
const ItemFreightClassSchema = z.object({
    key: z.string().optional(),
    value: z.string(),
}).optional();
// Item gross weight weight unit schema
const ItemGrossWeightWeightUnitSchema = z.object({
    key: z.string(),
    value: z.string(),
});
// Item gross weight schema
const ItemGrossWeightSchema = z.object({
    weight: z.union([z.string(), z.number()]),
    weightUnit: ItemGrossWeightWeightUnitSchema.optional(),
});
// Item handling unit schema
const ItemHandlingUnitSchema = z.object({
    key: z.string().optional(),
    value: z.string(),
}).optional();
// Item unit schema
const ItemUnitSchema = z.object({
    value: z.string(),
}).optional();
// Item max/min temp unit schema
const ItemTempUnitSchema = z.object({
    key: z.string(),
    value: z.string(),
}).optional();
// Item max temp schema
const ItemMaxTempSchema = z.object({
    temp: z.number().optional(),
    tempUnit: ItemTempUnitSchema.optional(),
}).optional();
// Item min temp schema
const ItemMinTempSchema = z.object({
    temp: z.number().optional(),
    tempUnit: ItemTempUnitSchema.optional(),
}).optional();
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
    }).optional(),
    itemNumber: z.string().nullish().optional(),
    maxStackCount: z.number().nullish().optional(),
    maxTemp: ItemMaxTempSchema,
    minTemp: ItemMinTempSchema,
    name: z.string().optional(),
    qty: z.union([z.string(), z.number()]).transform(data => String(data)).optional(), // number or string --> string
    stackable: z.boolean().optional(),
    unit: ItemUnitSchema,
});
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
}).optional();
// Route appointment schema - only required fields
const RouteAppointmentSchema = z.object({
    flex: z.number().optional(),
    scheduling: z.object({
        key: z.string().optional(),
        value: z.string(),
    }).optional(),
    start: z.string().optional(),
    timeZone: z.string().optional(),
}).optional();
// Route location schema
const RouteLocationSchema = z.object({
    name: z.string().optional(),
}).optional();
// Route services schema
const RouteServicesSchema = z.array(z.object({
    key: z.string().optional(),
    value: z.string(),
})).optional();
// Route stop type schema
const RouteStopTypeSchema = z.object({
    key: z.string().optional(),
    value: z.string(),
}).optional();
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
});
// Customer order schema - only required fields
const CustomerOrderSchema = z.object({
    contacts: z.array(ContactSchema).optional(),
    costs: CostsSchema.optional(),
    customer: CustomerSchema,
    items: z.array(CustomerOrderItemSchema).optional(),
    route: z.array(RouteSchema).optional(),
    totalMiles: z.number().optional(),
});
// Carrier schema - only required fields
const CarrierSchema = z.object({
    id: z.number(),
    name: z.string(),
});
// Carrier order schema - only required fields
const CarrierOrderSchema = z.object({
    carrier: CarrierSchema,
    contacts: z.array(ContactSchema).optional(),
    costs: z.object({
        totalAmount: z.number().optional(),
    }).optional(),
});
// Services schema
const ServiceSchema = z.object({
    key: z.string().optional(),
    value: z.string(),
});
export const ShipmentDetailsSchema = z.object({
    customId: z.string(),
    quoteId: z.string().optional(),
    services: z.array(ServiceSchema).nullish().optional(),
    status: StatusSchema,
    tracking: TrackingSchema,
    modeInfo: z.array(ModeInfoSchema).optional(),
    customerOrder: z.array(CustomerOrderSchema).optional(),
    carrierOrder: z.array(CarrierOrderSchema).optional(),
});
