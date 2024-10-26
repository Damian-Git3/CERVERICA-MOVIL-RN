import {
  BaseToast,
  ErrorToast,
  InfoToast,
  SuccessToast,
} from "react-native-toast-message";

export const toastConfig = {
  /*
   Success toast config
  */
  success: (props: any) => (
    <SuccessToast
      {...props}
      text1Style={{
        fontSize: 18,
      }}
      text2Style={{
        fontSize: 16,
      }}
    />
  ),

  /*
   Error toast config
  */
  error: (props: any) => (
    <ErrorToast
      {...props}
      text1Style={{
        fontSize: 18,
      }}
      text2Style={{
        fontSize: 16,
      }}
    />
  ),

  /*
   Info toast config
  */
  info: (props: any) => (
    <InfoToast
      {...props}
      text1Style={{
        fontSize: 18,
      }}
      text2Style={{
        fontSize: 16,
      }}
    />
  ),
};
