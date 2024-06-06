import React from "react";
import useAuth from "./useAuth";
import { useQuery } from "@tanstack/react-query";
import useAxiosSecure from "./useAxiosSecure";

const UsePackageMembership = () => {
  const axiosSecure = useAxiosSecure();
  const { user, loading } = useAuth();
  const { data: membership = {} } = useQuery({
    queryKey: ["bookingBadge",user?.email],
    enabled: !loading,
    queryFn: async () => {
      const res = await axiosSecure(`/booking/${user?.email}`);
      return res.data;
    },
  });
  const badge=membership.badge
  return [membership,badge];
};

export default UsePackageMembership;
