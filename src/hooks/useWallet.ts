import { useQuery } from '@tanstack/react-query';
import { WalletBalance, TransferEstimate, WalletInfo } from '../types/wallet';

// 실제로는 API 호출이 되어야 하지만, 임시로 mock 데이터를 반환하는 함수들
const fetchWalletBalance = async (): Promise<WalletBalance> => {
  // TODO: 실제 API 호출로 대체
  return {
    ethBalance: "3",
    couponBalance: 10000,
    address: "0x742d35Cc6634C0532925a3b844Bc454e4438f44e"
  };
};

const fetchTransferEstimate = async (): Promise<TransferEstimate> => {
  // TODO: 실제 API 호출로 대체
  // 가스비에 대한 고정 쿠폰 사용량 반환
  return {
    estimatedCoupon: "2,000원"
  };
};

const fetchWalletList = async (): Promise<WalletInfo[]> => {
  // TODO: 실제 API 호출로 대체
  return [
    {
      id: "1",
      name: "My ETH Wallet",
      address: "0x742d35Cc6634C0532925a3b844Bc454e4438f44e"
    },
    {
      id: "2",
      name: "My BTC Wallet",
      address: "0x742d35Cc6634C0532925a3b844Bc454e4438f45e"
    }
  ];
};

export const useWalletBalance = () => {
  return useQuery<WalletBalance>({
    queryKey: ['walletBalance'],
    queryFn: fetchWalletBalance,
    refetchInterval: 10000, // 10초마다 갱신
  });
};

export const useTransferEstimate = () => {
  return useQuery<TransferEstimate>({
    queryKey: ['transferEstimate'],
    queryFn: fetchTransferEstimate,
  });
};

export const useWalletList = () => {
  return useQuery<WalletInfo[]>({
    queryKey: ['walletList'],
    queryFn: fetchWalletList,
  });
}; 