import { LoginButton } from "@/components/common/auth/LoginButton";
import { Metadata } from "next";

import { Card, Flex, Heading, Text } from "@radix-ui/themes";

import styles from "./home.module.css";

export default function Home() {
  return (
    <main
      className={
        styles.main + " h-[100vh] p-4 flex items-center justify-center"
      }
    >
      <Card className="login-card">
        <Flex direction="column" gap="4" align="center">
          <Heading as="h1" size="7" className="login-heading">
            🦦 Stoat Admin
          </Heading>
          <Text size="2" color="gray" align="center">
            Self-hosted instance management
          </Text>

          <LoginButton />

          <Text size="1" color="gray" align="center">
            <a href="https://github.com/aiden0rchad/stoat-admin-panel">
              Source Code
            </a>
          </Text>
        </Flex>
      </Card>
    </main>
  );
}
