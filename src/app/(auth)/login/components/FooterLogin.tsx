export default function FooterLogin() {
  return (
    <div className="text-center text-sm text-gray-600 mt-4">
      By signing in, you agree to our{" "}
      <a
        href="#legal/term"
        className="font-medium text-blue-600 hover:text-blue-500"
      >
        Terms of Service
      </a>{" "}
      and{" "}
      <a
        href="#legal/privacy"
        className="font-medium text-blue-600 hover:text-blue-500"
      >
        Privacy Policy
      </a>
      .
    </div>
  );
}
