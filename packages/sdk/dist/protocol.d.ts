export type SDKMessage = {
    source: "dodo-sdk";
    type: "INIT";
    instanceId: string;
    productId: string;
} | {
    source: "dodo-sdk";
    type: "CLOSE";
    instanceId: string;
};
export type CheckoutMessage = {
    source: "dodo-checkout";
    type: "READY";
    instanceId: string;
} | {
    source: "dodo-checkout";
    type: "SUCCESS";
    instanceId: string;
    sessionId: string;
} | {
    source: "dodo-checkout";
    type: "ERROR";
    instanceId: string;
    code: string;
    message: string;
} | {
    source: "dodo-checkout";
    type: "CLOSED";
    instanceId: string;
    reason: "user" | "success" | "programmatic";
};
