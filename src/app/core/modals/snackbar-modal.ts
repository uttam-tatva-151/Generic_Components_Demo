export type SnackbarPosition =
  | 'top-left' | 'top-center' | 'top-right'
  | 'bottom-left' | 'bottom-center' | 'bottom-right'
  | 'center';

export type SnackbarType = 'info' | 'success' | 'warning' | 'error' | 'custom';

export interface SnackbarAction {
  label: string;
  action: () => void;
  color?: string;
  icon?: string;
}

export interface SnackbarData {
  id?: string;
  title?: string;
  message: string;
  status?: SnackbarType;
  icon?: string;
  details?: string;
  subtitle?: string;
  avatarUrl?: string;
  link?: { url: string; text: string };
  actions?: SnackbarAction[];
  autoClose?: boolean;
  duration?: number;
  showClose?: boolean;
  progress?: number;
  customClass?: string;
  customStyle?: { [key: string]: string };
  ariaLabel?: string;
  position?: SnackbarPosition;
  showDetailsBtn?: boolean;
  expanded?: boolean;
}