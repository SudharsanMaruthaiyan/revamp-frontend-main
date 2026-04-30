"use client";

import { useEffect, useState } from "react";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import { 
  User, 
  Mail, 
  Phone, 
  ShieldCheck, 
  Camera,
  ChevronRight,
  Trophy
} from "lucide-react";
import { getUserApi, updateProfileApi, type UserDetails, type UpdateProfilePayload } from "@/modules/user/api";
import { parseApiError } from "@/lib/parse-api-errors";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { PageLoader } from "@/components/ui/Loader";
import { ContentLayout } from "@/components/layout/ContentLayout";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/shell-primitives";

export default function ProfilePage() {
  const { data: session, status } = useSession();
  const router = useRouter();
  const [user, setUser] = useState<UserDetails | null>(null);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");

  const userId = (session?.user as { id?: string; userId?: string })?.id ?? (session?.user as { userId?: string })?.userId;

  useEffect(() => {
    if (status === "unauthenticated") {
      router.replace("/login");
      return;
    }
    if (status !== "authenticated" || !userId) return;
    let cancelled = false;
    getUserApi(userId)
      .then((res) => {
        if (cancelled) return;
        setUser(res.data);
        setName(res.data.name ?? "");
        setEmail(res.data.email ?? "");
      })
      .catch((err) => {
        if (!cancelled) toast.error(parseApiError(err));
      })
      .finally(() => {
        if (!cancelled) setLoading(false);
      });
    return () => {
      cancelled = true;
    };
  }, [status, userId, router]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!userId) return;
    setSaving(true);
    const payload: UpdateProfilePayload = { name: name.trim() || undefined, email: email.trim() || undefined };
    try {
      const res = await updateProfileApi(userId, payload);
      setUser(res.data);
      toast.success("Profile updated successfully");
    } catch (err) {
      toast.error(parseApiError(err));
    } finally {
      setSaving(false);
    }
  };

  if (status === "loading" || loading) return <PageLoader />;
  if (!user) {
    return (
      <div className="container py-12 text-center text-muted-foreground">
        Could not load profile. Check the toast for details.
      </div>
    );
  }

  const userInitials = (user.name || "U").charAt(0).toUpperCase();

  return (
    <ContentLayout title="Profile">
      <div className="max-w-5xl mx-auto py-8 px-4 space-y-8">
        {/* Profile Header */}
        <div className="relative rounded-3xl overflow-hidden bg-gradient-to-r from-gray-900 to-slate-800 p-8 md:p-12 text-white">
          <div className="absolute top-0 right-0 w-64 h-64 bg-[#F1A33C]/20 blur-[100px] rounded-full -mr-32 -mt-32" />
          <div className="relative flex flex-col md:flex-row items-center gap-8">
            <div className="relative group">
              <Avatar className="w-32 h-32 border-4 border-white/10 shadow-2xl">
                <AvatarImage src="#" />
                <AvatarFallback className="text-4xl font-bold bg-[#F1A33C] text-white">
                  {userInitials}
                </AvatarFallback>
              </Avatar>
              <button className="absolute bottom-1 right-1 p-2 bg-white text-gray-900 rounded-full shadow-lg opacity-0 group-hover:opacity-100 transition-opacity">
                <Camera className="w-4 h-4" />
              </button>
            </div>
            <div className="text-center md:text-left space-y-2">
              <h1 className="text-3xl font-bold tracking-tight">{user.name}</h1>
              <p className="text-white/60 flex items-center justify-center md:justify-start gap-2">
                <Mail className="w-4 h-4" />
                {user.email}
              </p>
              <div className="flex flex-wrap justify-center md:justify-start gap-3 pt-2">
                <span className="px-3 py-1 bg-white/10 rounded-full text-xs font-semibold backdrop-blur-sm border border-white/5">
                  Student Member
                </span>
                <span className="px-3 py-1 bg-[#F1A33C]/20 text-[#F1A33C] rounded-full text-xs font-semibold backdrop-blur-sm border border-[#F1A33C]/10">
                  Verified Account
                </span>
              </div>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Left: General Info Card */}
          <Card className="lg:col-span-2 border-none shadow-sm bg-white/50 backdrop-blur-sm border border-white/20 rounded-2xl">
            <CardHeader className="p-6 pb-0">
              <CardTitle className="text-xl flex items-center gap-2">
                <User className="w-5 h-5 text-[#F1A33C]" />
                Personal Information
              </CardTitle>
            </CardHeader>
            <CardContent className="p-6">
              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <Label htmlFor="name" className="text-sm font-semibold text-gray-700">Display Name</Label>
                    <div className="relative">
                      <Input
                        id="name"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        className="pl-10 h-12 rounded-xl border-gray-100 focus:ring-[#F1A33C] focus:border-[#F1A33C]"
                        placeholder="John Doe"
                      />
                      <User className="absolute left-3 top-3.5 w-4 h-4 text-gray-400" />
                    </div>
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="email" className="text-sm font-semibold text-gray-700">Email Address</Label>
                    <div className="relative">
                      <Input
                        id="email"
                        type="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        className="pl-10 h-12 rounded-xl border-gray-100 focus:ring-[#F1A33C] focus:border-[#F1A33C]"
                        placeholder="john@example.com"
                      />
                      <Mail className="absolute left-3 top-3.5 w-4 h-4 text-gray-400" />
                    </div>
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="phone" className="text-sm font-semibold text-gray-700">Mobile Number</Label>
                    <div className="relative">
                      <Input
                        id="phone"
                        value={user.phone_number ?? ""}
                        disabled
                        className="pl-10 h-12 bg-gray-50/50 rounded-xl border-gray-100 text-gray-500 cursor-not-allowed"
                      />
                      <Phone className="absolute left-3 top-3.5 w-4 h-4 text-gray-400" />
                    </div>
                    <p className="text-[10px] text-muted-foreground pt-1">Contact support to change phone number</p>
                  </div>
                </div>

                <div className="flex justify-end pt-4">
                  <Button 
                    type="submit" 
                    disabled={saving} 
                    className="h-12 px-8 rounded-xl bg-[#F1A33C] hover:bg-[#E0922B] text-white font-bold transition-all shadow-lg shadow-[#F1A33C]/20"
                  >
                    {saving ? "Saving Changes..." : "Save Profile Information"}
                  </Button>
                </div>
              </form>
            </CardContent>
          </Card>

          {/* Right: Sidebar Cards */}
          <div className="space-y-6">
            <Card className="border-none shadow-sm bg-white rounded-2xl">
              <CardHeader className="p-6">
                <CardTitle className="text-lg flex items-center gap-2">
                  <ShieldCheck className="w-5 h-5 text-green-500" />
                  Account Security
                </CardTitle>
              </CardHeader>
              <CardContent className="p-6 pt-0 space-y-4">
                <button
                  onClick={() => router.push("/change-password")}
                  className="w-full flex items-center justify-between p-4 rounded-xl border border-gray-50 hover:bg-gray-50 transition-colors group"
                >
                  <div className="text-left">
                    <p className="text-sm font-bold text-gray-900">Change Password</p>
                    <p className="text-xs text-muted-foreground">Keep your account secure</p>
                  </div>
                  <ChevronRight className="w-4 h-4 text-gray-400 group-hover:text-[#F1A33C] transition-colors" />
                </button>
                <div className="p-4 rounded-xl bg-orange-50/50 border border-orange-100">
                  <p className="text-xs font-semibold text-orange-800">Two-Factor Authentication</p>
                  <p className="text-[10px] text-orange-600/70 mt-1">Currently being rolled out to all student members.</p>
                </div>
              </CardContent>
            </Card>

            <div className="rounded-2xl bg-[#F1A33C] p-6 text-white text-center space-y-3 shadow-lg shadow-[#F1A33C]/20">
              <Trophy className="w-12 h-12 mx-auto opacity-80" />
              <h4 className="font-bold">Next Milestone</h4>
              <p className="text-xs text-white/80">Complete the Java Projects to earn your first internship certificate!</p>
              <Button 
                variant="outline" 
                className="w-full h-10 bg-white/10 border-white/20 hover:bg-white/20 text-white rounded-xl text-xs"
                onClick={() => router.push("/course")}
              >
                Go to Courses
              </Button>
            </div>
          </div>
        </div>
      </div>
    </ContentLayout>
  );
}
