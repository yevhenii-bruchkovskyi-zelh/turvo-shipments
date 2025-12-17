import { z } from 'zod';
// Helper schemas for nested structures
const KeyValueSchema = z.object({
    key: z.string(),
    value: z.string(),
});
const DateWithTimezoneSchema = z.object({
    date: z.string(),
    timeZone: z.string().optional(),
    flex: z.number().optional(),
    hasTime: z.boolean().optional(),
    timezone: z.string().optional(),
});
const AppointmentSchema = z.object({
    date: z.string().nullable().optional(),
    start: z.string().optional(),
    timeZone: z.string().optional(),
    timezone: z.string().optional(),
    flex: z.number().optional(),
    hasTime: z.boolean().optional(),
    scheduling: KeyValueSchema.optional(),
});
const AppointmentDateSchema = z.object({
    schedulingType: KeyValueSchema.optional(),
    appointment: AppointmentSchema.optional(),
    from: AppointmentSchema.optional(),
    to: AppointmentSchema.optional(),
});
const AddressSchema = z.object({
    id: z.string().optional(),
    line1: z.string().optional(),
    line2: z.string().nullable().optional(),
    line3: z.string().nullable().optional(),
    city: z.string().or(z.object({ name: z.string() })).optional(),
    state: z.string().or(z.object({ name: z.string() })).optional(),
    zip: z.string().nullable().optional(),
    country: z.union([
        z.string(),
        z.object({ name: z.string(), code: z.string().optional() }),
        z.object({ name: z.string() }),
    ]).nullable().optional(),
    countryName: z.string().optional(),
    countryCode: z.string().optional(),
    lon: z.number().optional(),
    lat: z.number().optional(),
    active: z.boolean().optional(),
    primary: z.boolean().optional(),
    gps: z.object({
        coordinates: z.array(z.number()),
    }).optional(),
    type: z.object({
        id: z.number(),
        key: z.string(),
        value: z.string(),
    }).optional(),
});
const LocationSchema = z.object({
    id: z.number(),
    name: z.string().optional(),
});
const UserSchema = z.object({
    id: z.number(),
    name: z.string(),
    photo: z.string().optional(),
    reference: z.number().optional(),
});
const ContributorSchema = z.object({
    id: z.number(),
    deleted: z.boolean(),
    contributorUser: UserSchema,
    title: KeyValueSchema,
});
const RouteStepSchema = z.object({
    visitedGeoWayPoints: z.string(),
    countGeoWayPoints: z.number(),
    stepsPolyline: z.string(),
});
const TrackingSchema = z.object({
    isTrackable: z.boolean(),
    deleted: z.boolean(),
    isTracking: z.boolean(),
    description: z.string(),
    source: z.string(),
    frequency: z.number(),
    routeSteps: RouteStepSchema.optional(),
});
const MarginSchema = z.object({
    minPay: z.number().optional(),
    maxPay: z.number().optional(),
    totalReceivableAmount: z.number().optional(),
    totalPayableAmount: z.number().optional(),
    amount: z.number().optional(),
    value: z.number().optional(),
});
const LaneSchema = z.object({
    start: z.string(),
    end: z.string(),
});
const WeightUnitSchema = z.object({
    key: z.string(),
    value: z.string(),
    id: z.number().optional(),
});
const WeightSchema = z.object({
    weight: z.union([z.string(), z.number()]),
    weightUnit: WeightUnitSchema.optional(),
});
const DimensionsSchema = z.object({
    height: z.number().optional(),
    width: z.number().optional(),
    length: z.number().optional(),
    units: z.object({
        key: z.string(),
        value: z.string(),
        id: z.number().optional(),
    }).optional(),
});
const ShipLocationSchema = z.object({
    id: z.number(),
    globalShipLocationId: z.number().optional(),
    name: z.string().optional(),
    globalShipLocationSourceId: z.string().nullable().optional(),
});
const OrderItemSchema = z.object({
    id: z.number(),
    deleted: z.boolean(),
    dimensions: DimensionsSchema.optional(),
    qty: z.union([z.string(), z.number()]).optional(),
    unit: KeyValueSchema.optional(),
    name: z.string().optional(),
    pickupLocation: z.array(ShipLocationSchema).optional(),
    deliveryLocation: z.array(ShipLocationSchema).optional(),
    netWeight: WeightSchema.optional(),
    weight: z.union([z.string(), z.number()]).optional(),
    grossWeight: WeightSchema.optional(),
    freightClass: KeyValueSchema.optional(),
});
const RouteStopSchema = z.object({
    id: z.number(),
    deleted: z.boolean(),
    globalShipLocationSourceId: z.string().optional(),
    globalShipLocationId: z.number().optional(),
    stopType: KeyValueSchema.optional(),
    location: LocationSchema.optional(),
    address: AddressSchema.optional(),
    extension: z.string().optional(),
    phone: z.string().optional(),
    sequence: z.number().optional(),
    state: z.string().optional(),
    appointment: z.object({
        start: z.string().optional(),
        timeZone: z.string().optional(),
        flex: z.number().optional(),
        hasTime: z.boolean().optional(),
        scheduling: KeyValueSchema.optional(),
    }).optional(),
    services: z.array(KeyValueSchema).optional(),
    poNumbers: z.array(z.string()).optional(),
    notes: z.string().optional(),
});
const CostsSchema = z.object({
    subTotal: z.number().optional(),
    totalAmount: z.number().optional(),
    deleted: z.boolean().optional(),
});
const BillToSchema = z.object({
    id: z.string(),
    billTo: z.string(),
    creditLimit: z.number().optional(),
    thirdParty: z.boolean().optional(),
    invoiceProfile: z.unknown().nullable().optional(),
    invoiceConsolidationRule: z.unknown().nullable().optional(),
    address: AddressSchema.optional(),
    emails: z.array(z.object({
        email: z.string(),
        primary: z.boolean(),
    })).nullable().optional(),
    phone: z.string().nullable().optional(),
    billingInstructions: z.string().nullable().optional(),
    contact: UserSchema.nullable().optional(),
});
const FreightTermsSchema = z.object({
    billTo: BillToSchema.optional(),
});
const CustomerOrderSchema = z.object({
    id: z.number(),
    deleted: z.boolean(),
    customer: z.object({
        id: z.number(),
        name: z.string(),
        owner: UserSchema.optional(),
    }),
    items: z.array(OrderItemSchema).optional(),
    route: z.array(RouteStopSchema).optional(),
    costs: CostsSchema.optional(),
    freightTerms: FreightTermsSchema.optional(),
});
const CarrierOrderSchema = z.object({
    id: z.number(),
    deleted: z.boolean(),
    carrier: z.object({
        id: z.number(),
        name: z.string(),
        owner: UserSchema.optional(),
    }),
    costs: CostsSchema.optional(),
});
const GroupSchema = z.object({
    id: z.number(),
    name: z.string(),
});
const FragmentDistanceSchema = z.object({
    value: z.number().optional(),
});
const TimeWithUnitsSchema = z.object({
    value: z.number(),
    units: KeyValueSchema,
});
const CurrencySchema = z.object({
    key: z.string(),
    value: z.string(),
});
const TotalSegmentValueSchema = z.object({
    value: z.number(),
    sync: z.boolean().optional(),
    currency: CurrencySchema.optional(),
});
const ModeInfoSchema = z.object({
    id: z.number(),
    segmentId: z.string().optional(),
    totalSegmentValue: TotalSegmentValueSchema.optional(),
    mode: KeyValueSchema.optional(),
    serviceType: KeyValueSchema.optional(),
    deleted: z.boolean(),
});
const GlobalRouteStopSchema = z.object({
    appointmentConfirmation: z.boolean().optional(),
    name: z.string().optional(),
    id: z.number(),
    globalShipLocationSourceId: z.string().optional(),
    schedulingType: KeyValueSchema.optional(),
    stopType: KeyValueSchema.optional(),
    timezone: z.string().optional(),
    location: LocationSchema.optional(),
    address: AddressSchema.optional(),
    segmentId: z.string().optional(),
    segmentSequence: z.number().optional(),
    sequence: z.number().optional(),
    state: z.string().optional(),
    appointment: AppointmentSchema.optional(),
    services: z.array(KeyValueSchema).optional(),
    poNumbers: z.array(z.string()).optional(),
    notes: z.string().optional(),
    customerOrder: z.array(z.object({
        customerId: z.number(),
        id: z.number(),
        deleted: z.boolean(),
    })).optional(),
    carrierOrder: z.array(z.object({
        carrierId: z.number(),
        id: z.number(),
        deleted: z.boolean(),
    })).optional(),
    deleted: z.boolean().optional(),
    fragmentDistance: FragmentDistanceSchema.optional(),
    isShipmentDwellTimeEdited: z.boolean().optional(),
    expectedDwellTime: TimeWithUnitsSchema.optional(),
    layoverTime: TimeWithUnitsSchema.optional(),
    originalAppointmentDate: AppointmentDateSchema.optional(),
    plannedDate: AppointmentDateSchema.optional(),
    plannedRequestedDate: AppointmentDateSchema.optional(),
    transportation: z.object({
        mode: KeyValueSchema.optional(),
        serviceType: KeyValueSchema.optional(),
    }).optional(),
});
const RoutingGuideSchema = z.object({
    segmentId: z.string(),
});
const StatusHistorySchema = z.object({
    lastUpdatedOn: z.string(),
    code: KeyValueSchema,
    fragmentId: z.string(),
});
const EquipmentSchema = z.object({
    id: z.number(),
    deleted: z.boolean(),
    type: KeyValueSchema,
});
const TagsSchema = z.object({
    value: z.array(z.string()),
});
export const ShipmentDetailsSchema = z.object({
    id: z.number(),
    customId: z.string(),
    ltlShipment: z.boolean(),
    phase: KeyValueSchema,
    servicesPartial: z.boolean().optional(),
    netCustomerCosts: z.number(),
    netCarrierCosts: z.number(),
    netRevenue: z.number(),
    custom_attributes: z.record(z.string(), z.unknown()).optional(),
    startDate: DateWithTimezoneSchema,
    endDate: DateWithTimezoneSchema.extend({
        date: z.string().nullable().optional(),
        flex: z.number().optional(),
    }).optional(),
    transportation: z.object({
        mode: KeyValueSchema,
        serviceType: KeyValueSchema,
    }),
    status: z.object({
        code: KeyValueSchema,
        notes: z.string().optional(),
        description: z.string().optional(),
        category: z.string().optional(),
    }),
    tracking: TrackingSchema,
    margin: MarginSchema.optional(),
    contributors: z.array(ContributorSchema).optional(),
    lane: LaneSchema,
    globalRoute: z.array(GlobalRouteStopSchema).optional(),
    groups: z.array(GroupSchema),
    customerOrder: z.array(CustomerOrderSchema).optional(),
    carrierOrder: z.array(CarrierOrderSchema).optional(),
    modeInfo: z.array(ModeInfoSchema).optional(),
    routingGuide: z.array(RoutingGuideSchema).optional(),
    statusHistory: z.array(StatusHistorySchema).optional(),
    equipment: z.array(EquipmentSchema).optional(),
    tags: TagsSchema.optional(),
    services: z.array(z.unknown()).nullable().optional(),
    servicesNote: z.string().optional(),
    quoteId: z.string().optional(),
    use_routing_guide: z.boolean().optional(),
});
