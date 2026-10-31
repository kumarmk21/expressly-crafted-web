import { useEffect, useState } from "react";
import { supabase } from "@/integrations/supabase/client";

export const useJobAccess = () => {
  const [loading, setLoading] = useState(true);
  const [allowed, setAllowed] = useState(false);
  const [signedIn, setSignedIn] = useState(false);
  useEffect(() => {
    let active = true;
    let revision = 0;
    const check = async () => {
      const current = ++revision;
      const { data, error } = await supabase.auth.getUser();
      let canManage = false;
      if (data.user && !error) {
        const results = await Promise.all([
          supabase.rpc("has_role", { _user_id: data.user.id, _role: "hr" }),
          supabase.rpc("has_role", { _user_id: data.user.id, _role: "admin" }),
        ]);
        canManage = results.some(result => !result.error && result.data === true);
      }
      if (!active || current !== revision) return;
      setSignedIn(Boolean(data.user) && !error);
      setAllowed(canManage);
      setLoading(false);
    };
    const { data } = supabase.auth.onAuthStateChange(() => {
      setTimeout(() => { if (active) void check(); }, 0);
    });
    void check();
    return () => { active = false; data.subscription.unsubscribe(); };
  }, []);
  return { loading, allowed, signedIn };
};