import React from 'react';
import { TrendingUp, TrendingDown, Minus } from 'lucide-react';

interface KPICardProps {
  primaryValue: string;
  secondaryLabel: string;
  trend?: 'up' | 'down' | 'neutral';
  trendValue?: string;
  icon?: React.ReactNode;
  accentColor?: 'emerald' | 'amber' | 'blue' | 'purple';
  onClick?: () => void;
}

const KPICard: React.FC<KPICardProps> = ({
  primaryValue,
  secondaryLabel,
  trend,
  trendValue,
  icon,
  accentColor = 'emerald',
  onClick
}) => {
  const accentColors = {
    emerald: {
      bg: 'bg-emerald-50',
      border: 'border-emerald-200',
      text: 'text-emerald-600',
      iconBg: 'bg-emerald-100'
    },
    amber: {
      bg: 'bg-amber-50',
      border: 'border-amber-200',
      text: 'text-amber-600',
      iconBg: 'bg-amber-100'
    },
    blue: {
      bg: 'bg-blue-50',
      border: 'border-blue-200',
      text: 'text-blue-600',
      iconBg: 'bg-blue-100'
    },
    purple: {
      bg: 'bg-purple-50',
      border: 'border-purple-200',
      text: 'text-purple-600',
      iconBg: 'bg-purple-100'
    }
  };

  const colors = accentColors[accentColor];

  const TrendIcon = trend === 'up' ? TrendingUp : trend === 'down' ? TrendingDown : Minus;

  return (
    <div
      onClick={onClick}
      className={`
        relative p-6 rounded-2xl border transition-all duration-300
        ${colors.bg} ${colors.border}
        ${onClick ? 'cursor-pointer hover:shadow-lg hover:scale-[1.02]' : ''}
      `}
    >
      {icon && (
        <div className={`w-10 h-10 ${colors.iconBg} rounded-xl flex items-center justify-center mb-4`}>
          <span className={colors.text}>{icon}</span>
        </div>
      )}

      <div className="text-3xl font-black text-slate-900 tracking-tight mb-1">
        {primaryValue}
      </div>

      <div className="text-xs font-semibold text-slate-500 uppercase tracking-wider">
        {secondaryLabel}
      </div>

      {trend && trendValue && (
        <div className="flex items-center gap-1 mt-3">
          <TrendIcon
            className={`w-4 h-4 ${
              trend === 'up' ? 'text-emerald-500' :
              trend === 'down' ? 'text-red-500' :
              'text-slate-400'
            }`}
          />
          <span className={`text-xs font-semibold ${
            trend === 'up' ? 'text-emerald-600' :
            trend === 'down' ? 'text-red-600' :
            'text-slate-500'
          }`}>
            {trendValue}
          </span>
        </div>
      )}
    </div>
  );
};

export default KPICard;
