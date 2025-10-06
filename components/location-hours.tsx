import { MapPin, Clock } from "lucide-react"
import { Card, CardContent } from "@/components/ui/card"

export function LocationHours() {
  const businessHours = [
    { day: "Monday - Friday", hours: "9:00 AM - 8:00 PM" },
    { day: "Saturday", hours: "10:00 AM - 9:00 PM" },
    { day: "Sunday", hours: "11:00 AM - 7:00 PM" },
  ]

  return (
    <div className="grid md:grid-cols-2 gap-6">
      {/* Location */}
      <Card>
        <CardContent className="pt-6">
          <div className="flex items-start gap-3 mb-4">
            <MapPin className="h-5 w-5 text-primary mt-1 flex-shrink-0" />
            <div>
              <h3 className="font-semibold text-lg mb-2">Our Location</h3>
              <p className="text-muted-foreground leading-relaxed">
                Santasi, near Owass SHS
                <br />
                Kumasi, Ghana
              </p>
            </div>
          </div>
<div className="mt-4 rounded-lg overflow-hidden border">
  <iframe
    src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3962.6!2d-1.6430820368098138!3d6.659187266120124!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x0!2zNsKwNDEnMTguMiJOIDHCsDM2JzU4LjciVw!5e0!3m2!1sen!2sgh!4v1234567890"
    width="100%"
    height="200"
    style={{ border: 0 }}
    allowFullScreen
    loading="lazy"
    referrerPolicy="no-referrer-when-downgrade"
    title="Frozen Treats Location"
  />
</div>
        </CardContent>
      </Card>

      {/* Business Hours */}
      <Card>
        <CardContent className="pt-6">
          <div className="flex items-start gap-3 mb-4">
            <Clock className="h-5 w-5 text-primary mt-1 flex-shrink-0" />
            <div className="flex-1">
              <h3 className="font-semibold text-lg mb-4">Business Hours</h3>
              <div className="space-y-3">
                {businessHours.map((schedule, index) => (
                  <div key={index} className="flex justify-between items-center py-2 border-b last:border-0">
                    <span className="text-muted-foreground">{schedule.day}</span>
                    <span className="font-medium">{schedule.hours}</span>
                  </div>
                ))}
              </div>
              <p className="text-sm text-muted-foreground mt-4 italic">* Hours may vary on public holidays</p>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
