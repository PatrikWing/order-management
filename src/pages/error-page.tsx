import Loader from "../components/Loader";

export default function ErrorPage(): React.ReactElement {
  return <Loader errorMessage="An unexpected error occurred" error={true} />;
}
