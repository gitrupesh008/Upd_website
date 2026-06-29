import { useEffect, useMemo, useState } from "react";
import { CalendarDays, Gift, Heart } from "lucide-react";
import { motion } from "motion/react";
import { useLanguage } from "../LanguageContext";
import { Member, readMembers, subscribeToMembers } from "../data/members";

function getBirthMonth(dateOfBirth: string) {
  const [, month] = dateOfBirth.split("-").map(Number);
  return month;
}

function getBirthDay(dateOfBirth: string) {
  const [, , day] = dateOfBirth.split("-").map(Number);
  return day;
}

function formatBirthDate(dateOfBirth: string) {
  const month = getBirthMonth(dateOfBirth);
  const day = getBirthDay(dateOfBirth);

  if (!month || !day) {
    return "";
  }

  return new Date(2026, month - 1, day).toLocaleDateString("en-US", {
    month: "long",
    day: "numeric",
  });
}

export default function MonthlyBirthdays() {
  const { lang } = useLanguage();
  const [members, setMembers] = useState<Member[]>(() => readMembers());
  const currentMonth = new Date().getMonth() + 1;
  const monthName = new Date().toLocaleString("en-US", { month: "long" });

  useEffect(() => {
    return subscribeToMembers(() => {
      setMembers(readMembers());
    });
  }, []);

  const monthlyBirthdays = useMemo(
    () =>
      members
        .filter((member) => member.dob && getBirthMonth(member.dob) === currentMonth)
        .sort((firstMember, secondMember) => {
          return getBirthDay(firstMember.dob) - getBirthDay(secondMember.dob);
        }),
    [currentMonth, members],
  );

  return (
    <section className="py-20 bg-ivory border-t border-gray-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-12">
          <div className="inline-flex items-center justify-center w-14 h-14 rounded-lg bg-accent text-primary mb-5">
            <Gift className="w-7 h-7" />
          </div>
          <h2 className="text-3xl md:text-4xl font-display font-bold text-primary mb-4">
            {lang === "en" ? `${monthName} Birthdays` : `${monthName} Birthdays`}
          </h2>
          <div className="w-24 h-1 bg-accent mx-auto mb-6"></div>
          <p className="text-gray-600 max-w-2xl mx-auto text-lg leading-relaxed">
            {lang === "en"
              ? "Birthday wishes from Lions International District 316-G."
              : "Birthday wishes from Lions International District 316-G."}
          </p>
        </motion.div>

        {monthlyBirthdays.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
            {monthlyBirthdays.map((member, index) => (
              <motion.div
                key={member.id}
                initial={{ opacity: 0, y: 16 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: index * 0.05 }}
                className="bg-white rounded-lg border border-gray-100 shadow-sm p-6 hover:border-accent transition-colors">
                <div className="flex items-start justify-between gap-4 mb-5">
                  <div>
                    <p className="text-xs font-bold uppercase tracking-wider text-gray-500 mb-2">
                      {formatBirthDate(member.dob)}
                    </p>
                    <h3 className="text-xl font-bold text-primary">{member.name}</h3>
                  </div>
                  <div className="flex h-11 w-11 items-center justify-center rounded-lg bg-primary/10 text-primary flex-shrink-0">
                    <CalendarDays className="w-5 h-5" />
                  </div>
                </div>
                <p className="text-gray-600 leading-relaxed">
                  Happy Birthday, {member.name}! Warm birthday wishes from Lions
                  International District 316-G.
                </p>
                <div className="mt-5 flex items-center gap-2 text-sm font-bold text-primary">
                  <Heart className="w-4 h-4 text-accent" />
                  Lions International District 316-G
                </div>
              </motion.div>
            ))}
          </div>
        ) : (
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            className="max-w-2xl mx-auto rounded-lg border border-gray-100 bg-white p-8 text-center shadow-sm">
            <CalendarDays className="w-10 h-10 text-gray-300 mx-auto mb-4" />
            <p className="text-lg font-semibold text-gray-600">
              {lang === "en"
                ? "No member birthdays are registered for this month yet."
                : "No member birthdays are registered for this month yet."}
            </p>
          </motion.div>
        )}
      </div>
    </section>
  );
}

