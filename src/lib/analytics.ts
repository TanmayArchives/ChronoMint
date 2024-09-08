import ReactGA from 'react-ga4';


export const initGA = (measurementId: string) => {
  ReactGA.initialize(measurementId);
};


export const trackPageView = (path: string) => {
  ReactGA.send({ hitType: 'pageview', page: path });
};


export const trackEvent = (eventName: string, properties?: Record<string, unknown>) => {
  console.log(`Analytics event: ${eventName}`, properties);
  ReactGA.event({
    category: 'User Interaction',
    action: eventName,
    label: properties ? JSON.stringify(properties) : undefined,
  });
};


export const setUserProperties = (properties: Record<string, unknown>) => {
  ReactGA.set(properties);
};


export const trackException = (description: string, fatal: boolean = false) => {
  ReactGA.event({
    category: 'Exception',
    action: description,
    label: fatal ? 'fatal' : 'non-fatal',
  });
};


export const trackTiming = (category: string, variable: string, value: number, label?: string) => {
  ReactGA.event({
    category: 'Timing',
    action: category,
    label: `${variable}${label ? ': ' + label : ''}`,
    value: Math.round(value),
  });
};