"use client"

import * as React from "react"
import { useState } from "react"
import { motion } from "framer-motion"
import { cn } from "@/lib/utils"
import { Button } from "@/components/ui"

interface ContactFormProps {
  className?: string
  onSubmit?: (data: ContactFormData) => void
}

interface ContactFormData {
  name: string
  email: string
  subject: string
  message: string
}

const ContactForm = React.forwardRef<HTMLFormElement, ContactFormProps>(
  ({ className, onSubmit }, ref) => {
    const [formData, setFormData] = useState<ContactFormData>({
      name: "",
      email: "",
      subject: "",
      message: ""
    })
    const [isSubmitting, setIsSubmitting] = useState(false)
    const [submitStatus, setSubmitStatus] = useState<"idle" | "success" | "error">("idle")

    const handleInputChange = (field: keyof ContactFormData, value: string) => {
      setFormData(prev => ({ ...prev, [field]: value }))
    }

    const handleSubmit = async (e: React.FormEvent) => {
      e.preventDefault()
      setIsSubmitting(true)
      
      try {
        // Simulate API call
        await new Promise(resolve => setTimeout(resolve, 1000))
        
        if (onSubmit) {
          onSubmit(formData)
        }
        
        setSubmitStatus("success")
        setFormData({ name: "", email: "", subject: "", message: "" })
        
        // Reset status after 3 seconds
        setTimeout(() => setSubmitStatus("idle"), 3000)
      } catch {
        setSubmitStatus("error")
        setTimeout(() => setSubmitStatus("idle"), 3000)
      } finally {
        setIsSubmitting(false)
      }
    }

    return (
      <form
        ref={ref}
        onSubmit={handleSubmit}
        className={cn("space-y-6", className)}
      >
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="space-y-2">
            <label htmlFor="name" className="text-sm font-medium text-foreground">
              Name
            </label>
            <input
              id="name"
              name="name"
              type="text"
              value={formData.name}
              onChange={(e: React.ChangeEvent<HTMLInputElement>) => handleInputChange("name", e.target.value)}
              required
              placeholder="John Doe"
              className={cn(
                "w-full px-4 py-3 rounded-xl border border-border/20 bg-background/80 backdrop-blur-sm",
                "transition-all duration-300",
                "focus:outline-none focus:ring-2 focus:ring-cyber-blue/20 focus:border-cyber-blue",
                "placeholder:text-muted-foreground/50"
              )}
            />
          </div>
          
          <div className="space-y-2">
            <label htmlFor="email" className="text-sm font-medium text-foreground">
              Email
            </label>
            <input
              id="email"
              name="email"
              type="email"
              value={formData.email}
              onChange={(e: React.ChangeEvent<HTMLInputElement>) => handleInputChange("email", e.target.value)}
              required
              placeholder="john@example.com"
              className={cn(
                "w-full px-4 py-3 rounded-xl border border-border/20 bg-background/80 backdrop-blur-sm",
                "transition-all duration-300",
                "focus:outline-none focus:ring-2 focus:ring-cyber-blue/20 focus:border-cyber-blue",
                "placeholder:text-muted-foreground/50"
              )}
            />
          </div>
        </div>
        
        <div className="space-y-2">
          <label htmlFor="subject" className="text-sm font-medium text-foreground">
            Subject
          </label>
          <input
            id="subject"
            name="subject"
            type="text"
            value={formData.subject}
            onChange={(e: React.ChangeEvent<HTMLInputElement>) => handleInputChange("subject", e.target.value)}
            required
            placeholder="Project Inquiry"
            className={cn(
              "w-full px-4 py-3 rounded-xl border border-border/20 bg-background/80 backdrop-blur-sm",
              "transition-all duration-300",
              "focus:outline-none focus:ring-2 focus:ring-cyber-blue/20 focus:border-cyber-blue",
              "placeholder:text-muted-foreground/50"
            )}
          />
        </div>
        
        <div className="space-y-2">
          <label htmlFor="message" className="text-sm font-medium text-foreground">
            Message
          </label>
          <textarea
            id="message"
            className={cn(
              "w-full px-4 py-3 rounded-xl border border-border/20 bg-background/80 backdrop-blur-sm",
              "transition-all duration-300 resize-none",
              "focus:outline-none focus:ring-2 focus:ring-cyber-blue/20 focus:border-cyber-blue",
              "placeholder:text-muted-foreground/50",
              "min-h-[120px]"
            )}
            placeholder="Tell me about your project..."
            value={formData.message}
            onChange={(e: React.ChangeEvent<HTMLTextAreaElement>) => handleInputChange("message", e.target.value)}
            required
            rows={5}
          />
        </div>
        
        <div className="flex flex-col sm:flex-row gap-4">
          <Button
            type="submit"
            variant="cyber"
            size="lg"
            disabled={isSubmitting}
            className="flex-1"
          >
            {isSubmitting ? "Sending..." : "Send Message"}
          </Button>
          
          {submitStatus === "success" && (
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              className="flex items-center text-green-400"
            >
              <span className="text-sm">✓ Message sent successfully!</span>
            </motion.div>
          )}
          
          {submitStatus === "error" && (
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              className="flex items-center text-red-400"
            >
              <span className="text-sm">✗ Failed to send message</span>
            </motion.div>
          )}
        </div>
      </form>
    )
  }
)
ContactForm.displayName = "ContactForm"

export { ContactForm }
