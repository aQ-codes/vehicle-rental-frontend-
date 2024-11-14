// otpMutations.ts
import { gql } from '@apollo/client';

export const VALIDATE_OTP_QUERY = gql`
  query ValidateOtp($phoneNumber: String!, $otp: String!) {
    validateOtp(phoneNumber: $phoneNumber, otp: $otp)
  }
`;
