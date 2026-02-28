import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Loader2 } from 'lucide-react';
import { useSaveDemoBookingRequest } from '../hooks/useQueries';
import { toast } from 'sonner';

interface DemoBookingFormProps {
  onSuccess?: () => void;
}

interface FormData {
  name: string;
  hospitalName: string;
  designation: string;
  mobile: string;
  email: string;
  city: string;
  message: string;
}

export default function DemoBookingForm({ onSuccess }: DemoBookingFormProps) {
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<FormData>();

  const saveDemoRequest = useSaveDemoBookingRequest();

  const onSubmit = async (data: FormData) => {
    try {
      await saveDemoRequest.mutateAsync(data);
      toast.success('Demo request submitted successfully! Our team will contact you soon at info@aihealthzon.com');
      reset();
      if (onSuccess) {
        onSuccess();
      }
    } catch (error) {
      toast.error('Failed to submit demo request. Please try again or contact us at info@aihealthzon.com');
      console.error('Demo booking error:', error);
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
      <p className="text-sm text-muted-foreground mb-4">
        Submit your inquiry and we'll get back to you at <strong>info@aihealthzon.com</strong>
      </p>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="space-y-2">
          <Label htmlFor="name" className="text-enterprise-blue font-bold">
            Name *
          </Label>
          <Input
            id="name"
            {...register('name', { required: 'Name is required' })}
            className="border-enterprise-grey min-h-[44px] text-base"
            placeholder="Your full name"
          />
          {errors.name && <p className="text-sm text-destructive">{errors.name.message}</p>}
        </div>

        <div className="space-y-2">
          <Label htmlFor="hospitalName" className="text-enterprise-blue font-bold">
            Hospital Name *
          </Label>
          <Input
            id="hospitalName"
            {...register('hospitalName', { required: 'Hospital name is required' })}
            className="border-enterprise-grey min-h-[44px] text-base"
            placeholder="Your hospital/organization"
          />
          {errors.hospitalName && <p className="text-sm text-destructive">{errors.hospitalName.message}</p>}
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="space-y-2">
          <Label htmlFor="designation" className="text-enterprise-blue font-bold">
            Designation *
          </Label>
          <Input
            id="designation"
            {...register('designation', { required: 'Designation is required' })}
            className="border-enterprise-grey min-h-[44px] text-base"
            placeholder="Your role/position"
          />
          {errors.designation && <p className="text-sm text-destructive">{errors.designation.message}</p>}
        </div>

        <div className="space-y-2">
          <Label htmlFor="mobile" className="text-enterprise-blue font-bold">
            Mobile *
          </Label>
          <Input
            id="mobile"
            type="tel"
            {...register('mobile', {
              required: 'Mobile number is required',
              pattern: {
                value: /^[0-9]{10}$/,
                message: 'Please enter a valid 10-digit mobile number',
              },
            })}
            className="border-enterprise-grey min-h-[44px] text-base"
            placeholder="10-digit mobile number"
          />
          {errors.mobile && <p className="text-sm text-destructive">{errors.mobile.message}</p>}
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="space-y-2">
          <Label htmlFor="email" className="text-enterprise-blue font-bold">
            Email *
          </Label>
          <Input
            id="email"
            type="email"
            {...register('email', {
              required: 'Email is required',
              pattern: {
                value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                message: 'Please enter a valid email address',
              },
            })}
            className="border-enterprise-grey min-h-[44px] text-base"
            placeholder="your.email@example.com"
          />
          {errors.email && <p className="text-sm text-destructive">{errors.email.message}</p>}
        </div>

        <div className="space-y-2">
          <Label htmlFor="city" className="text-enterprise-blue font-bold">
            City *
          </Label>
          <Input
            id="city"
            {...register('city', { required: 'City is required' })}
            className="border-enterprise-grey min-h-[44px] text-base"
            placeholder="Your city"
          />
          {errors.city && <p className="text-sm text-destructive">{errors.city.message}</p>}
        </div>
      </div>

      <div className="space-y-2">
        <Label htmlFor="message" className="text-enterprise-blue font-bold">
          Message (Optional)
        </Label>
        <Textarea
          id="message"
          {...register('message')}
          className="border-enterprise-grey min-h-[100px] text-base"
          placeholder="Tell us about your requirements..."
        />
      </div>

      <Button
        type="submit"
        disabled={saveDemoRequest.isPending}
        className="w-full bg-enterprise-blue hover:bg-enterprise-blue/90 text-white min-h-[44px] text-base font-bold"
      >
        {saveDemoRequest.isPending ? (
          <>
            <Loader2 className="mr-2 h-4 w-4 animate-spin" />
            Submitting...
          </>
        ) : (
          'Book a Demo'
        )}
      </Button>
    </form>
  );
}
