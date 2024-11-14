// otpService.ts
import { useMutation, useLazyQuery } from '@apollo/client';
import { SEND_OTP_MUTATION } from '@/graphql/mutations/otp'; 
import { VALIDATE_OTP_QUERY } from '@/graphql/queries/otp'; 

export const useOtpService = () => {
  const [sendOtp, { data: sendOtpData, loading: sendOtpLoading, error: sendOtpError }] = useMutation(SEND_OTP_MUTATION);

  // Use `useLazyQuery` to make the OTP validation query callable as a function
  const [validateOtpQuery, { data: validateOtpData, loading: validateOtpLoading, error: validateOtpError }] = useLazyQuery(VALIDATE_OTP_QUERY);

  const requestOtp = async (phoneNumber: string) => {
      await sendOtp({ variables: { phoneNumber } });
  };

  const verifyOtp = async (phoneNumber: string, otp: string) => {
      await validateOtpQuery({ variables: { phoneNumber, otp } });
  };

  return {
    requestOtp,
    sendOtpData,
    sendOtpLoading,
    sendOtpError,
    verifyOtp,
    validateOtpData,
    validateOtpLoading,
    validateOtpError,
  };
};




