import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import { SpinLoading } from 'react-loading-spin';

const PackageType: React.FC = () => {
  const [paymentStatus, setPaymentStatus] = useState<'pending' | 'success' | 'failed'>('pending');
  const [paymentMessage, setPaymentMessage] = useState('');

  const checkPaymentStatus = async (subscriptionId: string) => {
    try {
      const response = await request({
        url: `${API_BASE_URL}/subscriptions/${subscriptionId}/status`,
        method: "GET",
      });
      
      if (response?.data?.status === 'paid') {
        setPaymentStatus('success');
        setPaymentMessage('Thanh toán thành công! Gói cước của bạn đã được kích hoạt.');
        return true;
      } else if (response?.data?.status === 'failed') {
        setPaymentStatus('failed');
        setPaymentMessage('Thanh toán thất bại. Vui lòng thử lại.');
        return true;
      }
      return false;
    } catch (error) {
      console.error('Error checking payment status:', error);
      return false;
    }
  };

  useEffect(() => {
    if (!openModal || !purchaseNew.id) return;

    const pollPaymentStatus = async () => {
      const isCompleted = await checkPaymentStatus(purchaseNew.id);
      if (!isCompleted) {
        // Continue polling every 5 seconds
        setTimeout(pollPaymentStatus, 5000);
      }
    };

    pollPaymentStatus();

    // Cleanup polling on unmount
    return () => {
      setPaymentStatus('pending');
      setPaymentMessage('');
    };
  }, [purchaseNew.id, openModal]);

  return (
    // ... existing code ...
    {purchasePlan.type === 2 ? (
      <div className="body qr-body">
        <div className="bill-details d-flex-column">
          <div className="bill-title">Tạo gói cước thành công</div>
          <div className="bill-subtitle">
            Vui lòng quét mã QR và kiểm tra thông tin thanh toán
          </div>
          {isImageLoading && (
            <div className="d-flex-centered" style={{ height: "238px" }}>
              <SpinLoading />
            </div>
          )}
          <img
            alt="qr-code"
            src={`https://img.vietqr.io/image/TCB-1852526888-compact2.jpg?amount=${
              planPeriod *
              (planPeriod === 12 ? 110 : planPeriod === 6 ? 120 : 200) *
              1000
            }&addInfo=${planPeriod}_${
              purchaseNew.id
            }&accountName=NGUYEN%20MANH%20PHUC`}
            onLoad={() => {
              setTimeout(() => setIsImageLoading(false), 100);
            }}
            style={{ display: isImageLoading ? "none" : "block" }}
          />
          {paymentStatus !== 'pending' && (
            <div className={`payment-status ${paymentStatus}`}>
              {paymentMessage}
            </div>
          )}
          <div className="bill-account">
            {/* ... existing bill account code ... */}
          </div>
          <div className="bill-amount">
            {/* ... existing bill amount code ... */}
          </div>
        </div>
        <QrBillIcon />
      </div>
    ) : (
      // ... existing code ...
    )}
    // ... existing code ...
  );
};

const ModalWrapper = styled.div`
  // ... existing styles ...

  .payment-status {
    margin-top: 20px;
    padding: 10px;
    border-radius: 8px;
    text-align: center;
    font-weight: 500;

    &.success {
      background-color: #E6F4EA;
      color: #1E7E34;
    }

    &.failed {
      background-color: #FBE9E7;
      color: #D32F2F;
    }
  }
`;

export default PackageType; 