import { v } from "convex/values";
import { query, action } from "./_generated/server";

export const searchLawyers = action({
  args: {
    location: v.string(),
    specialization: v.optional(v.string()),
  },
  handler: async (ctx, args) => {
    // This would typically integrate with a real lawyer directory API
    // For now, we'll return mock data based on location
    const mockLawyers = [
      {
        name: "Adv. Rajesh Kumar",
        email: "rajesh.kumar@lawfirm.com",
        phone: "+91-9876543210",
        address: `123 Legal Complex, ${args.location}`,
        specialization: ["Criminal Law", "Family Law"],
        rating: 4.5,
        location: args.location,
        website: "www.rajeshkumarlaw.com",
      },
      {
        name: "Adv. Priya Sharma",
        email: "priya.sharma@legalaid.com",
        phone: "+91-9876543211",
        address: `456 Court Street, ${args.location}`,
        specialization: ["Corporate Law", "Intellectual Property"],
        rating: 4.7,
        location: args.location,
        website: "www.priyasharmalaw.com",
      },
      {
        name: "Adv. Amit Patel",
        email: "amit.patel@lawchambers.com",
        phone: "+91-9876543212",
        address: `789 Justice Avenue, ${args.location}`,
        specialization: ["Property Law", "Civil Law"],
        rating: 4.3,
        location: args.location,
      },
      {
        name: "Adv. Sunita Reddy",
        email: "sunita.reddy@familylaw.com",
        phone: "+91-9876543213",
        address: `321 Legal Plaza, ${args.location}`,
        specialization: ["Family Law", "Divorce Law"],
        rating: 4.6,
        location: args.location,
        website: "www.sunitareddylaw.com",
      },
    ];

    // Filter by specialization if provided
    let filteredLawyers = mockLawyers;
    if (args.specialization) {
      filteredLawyers = mockLawyers.filter(lawyer =>
        lawyer.specialization.some(spec =>
          spec.toLowerCase().includes(args.specialization!.toLowerCase())
        )
      );
    }

    return filteredLawyers;
  },
});

export const getLawyersByLocation = query({
  args: { location: v.string() },
  handler: async (ctx, args) => {
    return await ctx.db
      .query("lawyers")
      .withIndex("by_location", (q) => q.eq("location", args.location))
      .collect();
  },
});
