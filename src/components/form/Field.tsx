export const inputClass =
  "w-full rounded-lg border border-black/10 bg-white px-3.5 py-3 text-base text-foreground shadow-sm transition focus:border-brand-green-700 focus:outline-none focus:ring-2 focus:ring-brand-green-700/20";

export function Field({
  label,
  required,
  className,
  children,
}: {
  label: string;
  required?: boolean;
  className?: string;
  children: React.ReactNode;
}) {
  return (
    <label className={`block ${className ?? ""}`}>
      <span className="mb-1.5 block text-sm font-medium text-brand-green-900">
        {label} {required && <span className="text-brand-red-600">*</span>}
      </span>
      {children}
    </label>
  );
}

export function CheckboxPill({
  label,
  checked,
  onChange,
}: {
  label: string;
  checked: boolean;
  onChange: (v: boolean) => void;
}) {
  return (
    <label className="cursor-pointer">
      <input
        type="checkbox"
        checked={checked}
        onChange={(e) => onChange(e.target.checked)}
        className="peer sr-only"
      />
      <span className="inline-flex min-h-11 items-center rounded-full border-2 border-brand-green-700/25 px-4 py-2.5 text-sm font-medium text-brand-green-900 transition peer-checked:border-brand-green-700 peer-checked:bg-brand-green-700 peer-checked:text-white">
        {label}
      </span>
    </label>
  );
}

export function ChoiceGroup({
  name,
  options,
  value,
  onChange,
  required,
}: {
  name: string;
  options: { value: string; label: string }[];
  value: string;
  onChange: (v: string) => void;
  required?: boolean;
}) {
  return (
    <div className="flex flex-wrap gap-3">
      {options.map((opt) => (
        <label key={opt.value} className="cursor-pointer">
          <input
            type="radio"
            name={name}
            value={opt.value}
            checked={value === opt.value}
            onChange={() => onChange(opt.value)}
            required={required}
            className="peer sr-only"
          />
          <span className="inline-flex min-h-11 items-center rounded-full border-2 border-brand-green-700/25 px-5 py-2.5 text-sm font-medium text-brand-green-900 transition peer-checked:border-brand-green-700 peer-checked:bg-brand-green-700 peer-checked:text-white">
            {opt.label}
          </span>
        </label>
      ))}
    </div>
  );
}
