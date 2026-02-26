import { PageTitle } from "@/components/common/navigation/PageTitle";
import { col } from "@/lib/db";
import { Metadata } from "next";

import {
  Badge,
  Card,
  Flex,
  Grid,
  Heading,
  Text,
} from "@radix-ui/themes";

export const metadata: Metadata = {
  title: "Stoat Dashboard",
  description: "Instance overview and platform statistics.",
};

async function getStats() {
  try {
    const [users, servers, channels, messages] = await Promise.all([
      col("users").countDocuments(),
      col("servers").countDocuments(),
      col("channels").countDocuments({ channel_type: { $ne: "SavedMessages" } }),
      col("messages").countDocuments(),
    ]);
    return { users, servers, channels, messages };
  } catch {
    return null;
  }
}

async function getRecentUsers() {
  try {
    return await col("users")
      .find({}, { projection: { _id: 1, username: 1, discriminator: 1 } })
      .sort({ _id: -1 })
      .limit(8)
      .toArray();
  } catch {
    return [];
  }
}

function StatCard({ label, value, color }: { label: string; value: string | number; color: string }) {
  return (
    <Card className="stat-card">
      <Flex direction="column" gap="1">
        <Text size="1" weight="medium" className="stat-label" style={{ color: `var(--${color}-11)` }}>
          {label}
        </Text>
        <Text size="7" weight="bold" className="stat-value">
          {typeof value === "number" ? value.toLocaleString() : value}
        </Text>
      </Flex>
    </Card>
  );
}

export default async function Home() {
  const stats = await getStats();
  const recentUsers = await getRecentUsers();

  return (
    <>
      <PageTitle metadata={metadata} />

      <Flex direction="column" gap="5" className="p-2">
        {/* Header */}
        <Flex direction="column" gap="1">
          <Heading size="6">Welcome to Stoat Admin</Heading>
          <Text size="2" color="gray">
            Manage and monitor your self-hosted Stoat Chat instance.
          </Text>
        </Flex>

        {/* Stats Grid */}
        {stats ? (
          <Grid columns="4" gap="4" className="dashboard-stats-grid">
            <StatCard label="Total Users" value={stats.users} color="blue" />
            <StatCard label="Servers" value={stats.servers} color="green" />
            <StatCard label="Channels" value={stats.channels} color="violet" />
            <StatCard label="Messages" value={stats.messages} color="orange" />
          </Grid>
        ) : (
          <Card>
            <Flex align="center" gap="2" className="p-2">
              <Badge color="red">Offline</Badge>
              <Text size="2">Could not connect to the database. Check your MONGODB and REDIS environment variables.</Text>
            </Flex>
          </Card>
        )}

        {/* Recent Users */}
        <Flex direction="column" gap="3">
          <Heading size="3">Recently Joined Users</Heading>
          {recentUsers.length > 0 ? (
            <Grid columns="2" gap="2">
              {recentUsers.map((user: any) => (
                <Card key={user._id} className="hover-card">
                  <Flex gap="2" align="center" className="p-1">
                    <Badge variant="surface" color="blue" radius="full">
                      {(user.username || "?").substring(0, 1).toUpperCase()}
                    </Badge>
                    <Text size="2" weight="medium">
                      {user.username}
                      <Text color="gray">#{user.discriminator}</Text>
                    </Text>
                  </Flex>
                </Card>
              ))}
            </Grid>
          ) : (
            <Text size="2" color="gray">No users yet — or the database is not connected.</Text>
          )}
        </Flex>

        {/* Footer */}
        <Text size="1" color="gray" className="pt-4">
          Stoat Admin Panel &middot;{" "}
          <a href="https://github.com/aiden0rchad/stoat-admin-panel">
            Source Code
          </a>
        </Text>
      </Flex>
    </>
  );
}
