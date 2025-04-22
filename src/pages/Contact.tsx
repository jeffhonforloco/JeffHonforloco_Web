
import React from 'react';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import Layout from '../components/layout/Layout';
import SEO from '../components/shared/SEO';
import { Button } from "@/components/ui/button";
import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { useToast } from '../hooks/use-toast';
import { Mail, MapPin, Phone } from 'lucide-react';

// Define form schema with validation rules
const formSchema = z.object({
  name: z.string().min(2, { message: "Name is required" }),
  email: z.string().email({ message: "Invalid email address" }),
  subject: z.string().min(2, { message: "Subject is required" }),
  message: z.string().min(10, { message: "Message must be at least 10 characters" }),
});

type FormValues = z.infer<typeof formSchema>;

const Contact = () => {
  const { toast } = useToast();
  
  // Initialize react-hook-form
  const form = useForm<FormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: "",
      email: "",
      subject: "",
      message: "",
    },
  });

  const onSubmit = async (data: FormValues) => {
    try {
      // In a real implementation, you would send this data to a server
      // For now, we'll just simulate a successful submission
      console.log("Form data:", data);
      
      // Direct users to email info@jeffhonforloco.com
      window.open(`mailto:info@jeffhonforloco.com?subject=${encodeURIComponent(data.subject)}&body=${encodeURIComponent(`Name: ${data.name}\nEmail: ${data.email}\n\n${data.message}`)}`);
      
      toast({
        title: "Message sent!",
        description: "We've received your message and will get back to you soon.",
      });
      
      form.reset();
    } catch (error) {
      console.error("Error submitting form:", error);
      toast({
        title: "Error",
        description: "There was a problem sending your message. Please try again.",
        variant: "destructive",
      });
    }
  };

  return (
    <Layout>
      <SEO 
        title="Contact Me" 
        description="Get in touch with Jeff HonForLoco for collaborations, inquiries, or just to say hello."
      />
      
      {/* Hero Section */}
      <section className="pt-24 pb-12 bg-offwhite">
        <div className="container-lg">
          <h1 className="title-lg mb-4">Contact Me</h1>
          <p className="text-gray-600 max-w-2xl mb-0">
            Have a question, feedback, or want to work together? I'd love to hear from you! 
            Fill out the form below or reach out directly via email.
          </p>
        </div>
      </section>
      
      {/* Contact Details & Form */}
      <section className="py-16 bg-white">
        <div className="container-lg">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
            {/* Contact Information */}
            <div className="lg:col-span-1">
              <div className="bg-gray-50 p-8 rounded-lg h-full">
                <h2 className="text-xl font-serif font-bold mb-6">Contact Information</h2>
                
                <div className="space-y-6">
                  <div className="flex items-start">
                    <div className="bg-gold text-white p-3 rounded-full mr-4">
                      <Mail className="h-5 w-5" />
                    </div>
                    <div>
                      <h3 className="text-sm font-medium text-gray-500">Email</h3>
                      <a href="mailto:info@jeffhonforloco.com" className="text-charcoal hover:text-gold transition-colors">
                        info@jeffhonforloco.com
                      </a>
                    </div>
                  </div>
                  
                  <div className="flex items-start">
                    <div className="bg-gold text-white p-3 rounded-full mr-4">
                      <Phone className="h-5 w-5" />
                    </div>
                    <div>
                      <h3 className="text-sm font-medium text-gray-500">Phone</h3>
                      <p className="text-charcoal">Available upon request</p>
                    </div>
                  </div>
                  
                  <div className="flex items-start">
                    <div className="bg-gold text-white p-3 rounded-full mr-4">
                      <MapPin className="h-5 w-5" />
                    </div>
                    <div>
                      <h3 className="text-sm font-medium text-gray-500">Location</h3>
                      <p className="text-charcoal">Honolulu, Hawaii</p>
                    </div>
                  </div>
                </div>
                
                <div className="mt-8">
                  <h3 className="text-sm font-medium text-gray-500 mb-3">Connect with me</h3>
                  <div className="flex space-x-4">
                    <a href="https://www.facebook.com/people/Jeff-Honforloco/61551819509232/" className="text-charcoal hover:text-gold transition-colors" aria-label="Facebook" target="_blank" rel="noopener noreferrer">
                      <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-facebook"><path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z"/></svg>
                    </a>
                    <a href="https://twitter.com" className="text-charcoal hover:text-gold transition-colors" aria-label="Twitter">
                      <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-twitter"><path d="M22 4s-.7 2.1-2 3.4c1.6 10-9.4 17.3-18 11.6 2.2.1 4.4-.6 6-2C3 15.5.5 9.6 3 5c2.2 2.6 5.6 4.1 9 4-.9-4.2 4-6.6 7-3.8 1.1 0 3-1.2 3-1.2z"/></svg>
                    </a>
                    <a href="https://instagram.com" className="text-charcoal hover:text-gold transition-colors" aria-label="Instagram">
                      <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-instagram"><rect width="20" height="20" x="2" y="2" rx="5" ry="5"/><path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"/><line x1="17.5" x2="17.51" y1="6.5" y2="6.5"/></svg>
                    </a>
                  </div>
                </div>
              </div>
            </div>
            
            {/* Contact Form */}
            <div className="lg:col-span-2">
              <Form {...form}>
                <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <FormField
                      control={form.control}
                      name="name"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Name</FormLabel>
                          <FormControl>
                            <Input placeholder="Your name" {...field} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    
                    <FormField
                      control={form.control}
                      name="email"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Email</FormLabel>
                          <FormControl>
                            <Input placeholder="Your email" {...field} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  </div>
                  
                  <FormField
                    control={form.control}
                    name="subject"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Subject</FormLabel>
                        <FormControl>
                          <Input placeholder="What is this about?" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  
                  <FormField
                    control={form.control}
                    name="message"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Message</FormLabel>
                        <FormControl>
                          <Textarea 
                            placeholder="Tell me more about your inquiry..." 
                            className="min-h-[150px]" 
                            {...field} 
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  
                  <Button type="submit" className="bg-gold hover:bg-gold/90 text-white">
                    Send Message
                  </Button>
                </form>
              </Form>
              
              <div className="mt-8 p-4 bg-gray-50 rounded-md">
                <p className="text-sm text-gray-600">
                  <strong>Note:</strong> You can also email me directly at{" "}
                  <a 
                    href="mailto:info@jeffhonforloco.com" 
                    className="text-gold hover:underline"
                  >
                    info@jeffhonforloco.com
                  </a>
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>
      
      {/* FAQ Section */}
      <section className="py-16 bg-offwhite">
        <div className="container-lg">
          <h2 className="title-md text-center mb-12">Frequently Asked Questions</h2>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-4xl mx-auto">
            <div className="bg-white p-6 rounded-lg shadow-sm">
              <h3 className="font-serif text-lg font-bold mb-3">What topics do you write about?</h3>
              <p className="text-gray-600">
                I cover a range of topics including travel, lifestyle, personal growth, health, and entertainment. I'm always open to discussing new ideas and collaborations!
              </p>
            </div>
            
            <div className="bg-white p-6 rounded-lg shadow-sm">
              <h3 className="font-serif text-lg font-bold mb-3">Do you accept guest posts?</h3>
              <p className="text-gray-600">
                I selectively accept guest posts that align with my blog's theme and values. Please reach out with your pitch for consideration.
              </p>
            </div>
            
            <div className="bg-white p-6 rounded-lg shadow-sm">
              <h3 className="font-serif text-lg font-bold mb-3">How quickly do you respond to inquiries?</h3>
              <p className="text-gray-600">
                I aim to respond to all messages within 1-2 business days. If your matter is urgent, please mention this in your subject line.
              </p>
            </div>
            
            <div className="bg-white p-6 rounded-lg shadow-sm">
              <h3 className="font-serif text-lg font-bold mb-3">Are you available for speaking engagements?</h3>
              <p className="text-gray-600">
                Yes, I'm available for speaking engagements related to my areas of expertise. Please provide details about your event in your message.
              </p>
            </div>
          </div>
        </div>
      </section>
    </Layout>
  );
};

export default Contact;
