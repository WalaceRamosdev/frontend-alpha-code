import { prisma } from "./prisma";
import type { Session } from "@auth/core/types";

export interface AuditOptions {
    userId?: string;
    action: string;
    entity?: string;
    entityId?: string;
    details?: any;
    request?: Request;
}

/**
 * Registra uma ação no log de auditoria do sistema
 */
export async function logSecurityActivity(options: AuditOptions) {
    try {
        const { userId, action, entity, entityId, details, request } = options;

        // Extrair IP e User Agent do request se disponível
        let ipAddress = null;
        let userAgent = null;

        if (request) {
            ipAddress = request.headers.get("x-forwarded-for") ||
                request.headers.get("x-real-ip");
            userAgent = request.headers.get("user-agent");
        }

        await (prisma as any).auditLog.create({
            data: {
                userId,
                action,
                entity,
                entityId,
                details: details ? JSON.parse(JSON.stringify(details)) : null,
                ipAddress,
                userAgent
            }
        });
    } catch (error) {
        console.error("Critical Security Logging Error:", error);
    }
}

/**
 * Verifica se a sessão é de um administrador
 * @throws Error se não for admin
 */
export function ensureAdmin(session: any) {
    if (!session || session.user?.role !== "ADMIN") {
        throw new Error("UNAUTHORIZED_ADMIN_ACCESS");
    }
    return true;
}

/**
 * Sanitiza dados sensíveis para logs
 */
export function sanitizeForLog(data: any) {
    const sensitiveKeys = ["password", "token", "secret", "cvv", "creditCard"];
    const sanitized = { ...data };

    for (const key of Object.keys(sanitized)) {
        if (sensitiveKeys.some(s => key.toLowerCase().includes(s))) {
            sanitized[key] = "[REDACTED]";
        }
    }

    return sanitized;
}
