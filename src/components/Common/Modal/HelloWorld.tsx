import BaseModal from "./BaseModal";
import { HelloWorldProps } from "./types";

export default function HelloWorld({ onModalClose, name }: HelloWorldProps) {
  const renderBody = () => {
    return <div>Hello, {name}!</div>;
  }

  return (
    <BaseModal
      headerText="Hello World"
      onModalClose={onModalClose}
      body={renderBody()}
      primaryButtonText="Ok!"
      onClickPrimaryButton={onModalClose}
      disabledPrimaryButton={false}
    />
  );
}
