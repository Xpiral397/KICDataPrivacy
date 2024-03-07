import React from "react";
import {
  Modal,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalFooter,
  Button,
  useDisclosure,
} from "@nextui-org/react";

type AccountStatus =
  | "CREATED_SUCCESS"
  | "LOGIN_SUCCESS"
  | "LOGIN_FAILED"
  | "ACTIVATION_FAILED";

interface StatusModalProps {
  status: AccountStatus;
  onSendActivationLink: () => void; // Function to send activation link
}

const StatusModal: React.FC<StatusModalProps> = ({
  status,
  onSendActivationLink,
}) => {
  const { isOpen, onOpen, onClose } = useDisclosure();

  // Infer title based on status
  const getTitle = (): string => {
    switch (status) {
      case "CREATED_SUCCESS":
        return "Account Created Successfully";
      case "LOGIN_SUCCESS":
        return "Login Successful";
      case "LOGIN_FAILED":
        return "Login Failed";
      case "ACTIVATION_FAILED":
        return "Activation Failed";
      default:
        return "Status";
    }
  };

  // Infer content and action based on status
  const getContentAndActions = () => {
    switch (status) {
      case "CREATED_SUCCESS":
        return {
          content:
            "Your account has been successfully created! A confirmation email has been sent. Please check your email to activate your account.",
          actions: (
            <Button color="primary" onPress={onClose}>
              OK
            </Button>
          ),
        };
      case "LOGIN_SUCCESS":
        return {
          content: "You have successfully logged in.",
          actions: (
            <Button color="primary" onPress={onClose}>
              Proceed to Dashboard
            </Button>
          ),
        };
      case "LOGIN_FAILED":
        return {
          content:
            "Failed to login. Please check your credentials and try again.",
          actions: (
            <>
              <Button color="danger" onPress={onClose}>
                Close
              </Button>
              <Button color="primary" onPress={onOpen}>
                {" "}
                {/* Presuming a retry would just reopen the modal for another action */}
                Retry
              </Button>
            </>
          ),
        };
      case "ACTIVATION_FAILED":
        return {
          content:
            "Failed to activate your account. Would you like to resend the activation link?",
          actions: (
            <>
              <Button color="danger" onPress={onClose}>
                Close
              </Button>
              <Button color="primary" onPress={onSendActivationLink}>
                Resend Activation Link
              </Button>
            </>
          ),
        };
      default:
        return { content: "", actions: null };
    }
  };

  const { content, actions } = getContentAndActions();

  return (
    <div>
      <Button onPress={onOpen} color="primary">
        Show Status
      </Button>
      <Modal isOpen={isOpen} onClose={onClose}>
        <ModalContent>
          <ModalHeader>{getTitle()}</ModalHeader>
          <ModalBody>{content}</ModalBody>
          <ModalFooter>{actions}</ModalFooter>
        </ModalContent>
      </Modal>
    </div>
  );
};

export default StatusModal;
