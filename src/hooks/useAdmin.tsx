import { useEffect, useState } from "react";
import { supabase } from "@/integrations/supabase/client";
import type { Session } from "@supabase/supabase-js";

export const useAdmin = () => {
  const [session, setSession] = useState<Session | null>(null);
  const [isAdmin, setIsAdmin] = useState(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let active = true;
    let requestId = 0;

    const applySession = async (nextSession: Session | null) => {
      const currentRequest = ++requestId;

      if (!nextSession) {
        if (!active || currentRequest !== requestId) return;
        setSession(null);
        setIsAdmin(false);
        setLoading(false);
        return;
      }

      if (active) {
        setSession(nextSession);
        setLoading(true);
      }

      const { data, error } = await supabase.rpc("has_role", {
        _user_id: nextSession.user.id,
        _role: "admin",
      });

      if (!active || currentRequest !== requestId) return;
      if (error) console.error("Admin role check failed", error);
      setIsAdmin(Boolean(data) && !error);
      setLoading(false);
    };

    supabase.auth.getSession().then(({ data }) => {
      void applySession(data.session);
    });

    const { data: sub } = supabase.auth.onAuthStateChange((_e, nextSession) => {
      setTimeout(() => void applySession(nextSession), 0);
    });

    return () => {
      active = false;
      sub.subscription.unsubscribe();
    };
  }, []);

  return { session, isAdmin, loading };
};
