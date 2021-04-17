/* permissions */
export const SUDO: string[] = ["*"];
export const OWNER: string[] = ["ADD", "UPDATE", "DELETE", "VIEW"];
export const ADMIN: string[] = ["ADD", "UPDATE", "VIEW"];
export const MEMBER: string[] = ["VIEW"];
export const PERMISSIONS: {label: string, scope: string}[] = [
    {label: "Read user details", scope: "user-{userId}:read-info"},
    {label: "Read user email", scope: "user-{userId}:read-email-*"},
    {label: "Read groups", scope: "user-{userId}:read-membership-*"},
    {label: "Read sessions", scope: "user-{userId}:read-session-*"},
    {label: "Write user email", scope: "user-{userId}:write-email-*"},
    {label: "Write user details", scope: "user-{userId}:write-info"},
    {label: "Enable TOTP", scope: "user-{userId}:write-mfa-totp"},
    {label: "Enable SMS", scope: "user-{userId}:write-mfa-sms"},
    {label: "Enable EMAIL", scope: "user-{userId}:write-mfa-email"},
    {label: "Disable MFA", scope: "user-{userId}:delete-mfa-*"},
    {label: "Regenerate MFA codes", scope: "user-{userId}:write-mfa-regenerate"},
    {label: "Logout of sessions", scope: "user-{userId}:delete-session-*"},
    {label: "Delete user email", scope: "user-{userId}:delete-email-*"},
    {label: "Delete user account", scope: "user-{userId}:deactivate"},
]