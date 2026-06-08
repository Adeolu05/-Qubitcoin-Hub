export type AnalyticsEvent =
  | "path_selected"
  | "learn_topic_complete"
  | "academy_quiz_pass"
  | "wizard_step_complete"
  | "tutor_query"
  | "troubleshooting_view"
  | "search_query";

type EventProps = Record<string, string | number | boolean | undefined>;

declare global {
  interface Window {
    plausible?: (event: string, options?: { props?: EventProps }) => void;
    qtcAnalytics?: { event: string; props?: EventProps; ts: number }[];
  }
}

export function trackEvent(event: AnalyticsEvent, props?: EventProps) {
  if (typeof window === "undefined") return;

  window.qtcAnalytics = window.qtcAnalytics ?? [];
  window.qtcAnalytics.push({ event, props, ts: Date.now() });

  if (typeof window.plausible === "function") {
    window.plausible(event, { props });
  }
}
