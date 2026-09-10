type CheckoutOptions = {
    productId: string;
    onSuccess?: (data: {
        sessionId: string;
    }) => void;
    onError?: (error: {
        code: string;
        message: string;
    }) => void;
    onClose?: (data: {
        reason: "user" | "success" | "programmatic";
    }) => void;
};
declare function open(options: CheckoutOptions): void;
export declare const DodoCheckout: {
    open: typeof open;
};
export {};
