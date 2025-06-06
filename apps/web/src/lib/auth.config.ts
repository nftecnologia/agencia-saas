import type { NextAuthConfig } from "next-auth"
import CredentialsProvider from "next-auth/providers/credentials"
import { z } from "zod"
import bcrypt from "bcryptjs"
import { PrismaClient } from "@prisma/client"

const prisma = new PrismaClient()

const loginSchema = z.object({
  email: z.string().email(),
  password: z.string().min(6),
})

export const authConfig: NextAuthConfig = {
  pages: {
    signIn: "/auth/signin",
    error: "/auth/error",
  },
  providers: [
    CredentialsProvider({
      name: "credentials",
      credentials: {
        email: { label: "Email", type: "email" },
        password: { label: "Password", type: "password" }
      },
      async authorize(credentials) {
        console.log("🔐 Tentativa de login:", credentials?.email)
        
        const parsed = loginSchema.safeParse(credentials)
        
        if (!parsed.success) {
          console.log("❌ Validação falhou:", parsed.error)
          return null
        }
        
        const { email, password } = parsed.data
        
        try {
          const user = await prisma.user.findUnique({
            where: { email },
            include: { agency: true }
          })
          
          console.log("👤 Usuário encontrado:", user ? "Sim" : "Não")
          
          if (!user || !user.isActive) {
            console.log("❌ Usuário não encontrado ou inativo")
            return null
          }
          
          const passwordMatch = await bcrypt.compare(password, user.password)
          console.log("🔑 Senha correta:", passwordMatch ? "Sim" : "Não")
          
          if (!passwordMatch) {
            console.log("❌ Senha incorreta")
            return null
          }
          
          console.log("✅ Login bem-sucedido para:", user.email)
          return {
            id: user.id,
            email: user.email,
            name: user.name,
            role: user.role,
            agencyId: user.agencyId,
            agencyName: user.agency.name,
          }
        } catch (error) {
          console.error("💥 Erro no authorize:", error)
          return null
        }
      }
    })
  ],
  callbacks: {
    async jwt({ token, user }) {
      if (user) {
        token.id = user.id
        token.role = user.role
        token.agencyId = user.agencyId
        token.agencyName = user.agencyName
      }
      return token
    },
    async session({ session, token }) {
      if (session.user) {
        session.user.id = token.id as string
        session.user.role = token.role as string
        session.user.agencyId = token.agencyId as string
        session.user.agencyName = token.agencyName as string
      }
      return session
    },
  },
  session: {
    strategy: "jwt",
  },
} satisfies NextAuthConfig
