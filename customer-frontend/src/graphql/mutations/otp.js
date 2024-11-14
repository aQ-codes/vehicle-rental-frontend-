// otpMutations.ts
import { gql } from '@apollo/client';

export const SEND_OTP_MUTATION = gql`
  mutation SendOtp($phoneNumber: String!) {
    sendOtp(phoneNumber: $phoneNumber)
  }
`;
