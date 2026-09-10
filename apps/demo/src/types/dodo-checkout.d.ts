declare global {
  interface Window {
    DodoCheckout: {
      open: (options: {
        productId: string;
        onSuccess?: (data: { sessionId: string }) => void;
        onError?: (error: Error) => void;
        onClose?: (data: { reason: string }) => void;
      }) => void;
    };
  }
}

export {};
