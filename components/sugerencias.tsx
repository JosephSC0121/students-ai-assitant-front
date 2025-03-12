import { usePostDataEmail } from "@/auth/services/email";
import {
  Modal,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalFooter,
  Button,
  useDisclosure,
  Input,
  Textarea,
  addToast,
} from "@heroui/react";
import { useState } from "react";

export const MailIcon = (props:any) => {
  return (
    <svg
      aria-hidden="true"
      fill="none"
      focusable="false"
      height="1em"
      role="presentation"
      viewBox="0 0 24 24"
      width="1em"
      {...props}
    >
      <path
        d="M17 3.5H7C4 3.5 2 5 2 8.5V15.5C2 19 4 20.5 7 20.5H17C20 20.5 22 19 22 15.5V8.5C22 5 20 3.5 17 3.5ZM17.47 9.59L14.34 12.09C13.68 12.62 12.84 12.88 12 12.88C11.16 12.88 10.31 12.62 9.66 12.09L6.53 9.59C6.21 9.33 6.16 8.85 6.41 8.53C6.67 8.21 7.14 8.15 7.46 8.41L10.59 10.91C11.35 11.52 12.64 11.52 13.4 10.91L16.53 8.41C16.85 8.15 17.33 8.2 17.58 8.53C17.84 8.85 17.79 9.33 17.47 9.59Z"
        fill="currentColor"
      />
    </svg>
  );
};

export default function Suggest() {
  const { isOpen, onOpen, onOpenChange } = useDisclosure();
  const [email, setEmail] = useState("");
  const [description, setDescription] = useState("");
  const [error, setError] = useState<string | null>(null);

  const [isLoading, setIsLoading] = useState(false);
  const { postData } = usePostDataEmail();

  const handleFormSubmit = async () => {
    if (!email) {
      setError("Por favor, ingresa tu correo electrónico");
      return;
    }

    setIsLoading(true);
    setError(null);

    const formData = {
      email,
      description,
    };

    try {
      await postData("user/users/", formData);

      addToast({
        title: "¡Gracias por tu sugerencia!",
        description: "Valoramos mucho tu opinión.",
      });

      setEmail("");
      setDescription("");
      onOpenChange();
    } catch (err:any) {
      const errorMessage = err.message || "Error al enviar la sugerencia.";
      setError(errorMessage);

      addToast({
        title: "Error",
        description: errorMessage,
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <>
      <Button color="primary" onPress={onOpen}>
        ¡Nos interesa saberlo!
      </Button>
      <Modal isOpen={isOpen} placement="top-center" onOpenChange={onOpenChange}>
        <ModalContent>
          {(onClose) => (
            <>
              <ModalHeader className="flex flex-col gap-1">Sugerencias</ModalHeader>
              <ModalBody>
                <Input
                  endContent={<MailIcon className="text-2xl text-default-400 pointer-events-none flex-shrink-0" />}
                  label="Email"
                  placeholder="Ingresa tu correo"
                  variant="bordered"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  isInvalid={!!error && !email}
                  errorMessage={!email && error ? error : ""}
                />
                <Textarea
                  label="Descripción"
                  placeholder="Escribe aquí qué crees que podría incluir la aplicación"
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                />
                {error && email && <p className="text-red-500 text-sm mt-1">{error}</p>}
              </ModalBody>
              <ModalFooter>
                <Button color="danger" variant="flat" onPress={onClose} isDisabled={isLoading}>
                  Cerrar
                </Button>
                <Button color="primary" onPress={handleFormSubmit} isLoading={isLoading} isDisabled={isLoading}>
                  {isLoading ? "Enviando..." : "Enviar"}
                </Button>
              </ModalFooter>
            </>
          )}
        </ModalContent>
      </Modal>
    </>
  );
}
