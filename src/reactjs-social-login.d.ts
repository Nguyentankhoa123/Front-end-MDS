declare module "reactjs-social-login" {
  export interface LoginSocialFacebookProps {
    appId: string;
    onResolve: (response: any) => void;
    onReject: (error: any) => void;
    children?: React.ReactNode;
  }

  export const LoginSocialFacebook: React.FC<LoginSocialFacebookProps>;
}
