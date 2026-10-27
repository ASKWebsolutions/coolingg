import {
  AirVent,
  Building2,
  Droplets,
  Flame,
  Gauge,
  Layers,
  Leaf,
  RefreshCw,
  Snowflake,
  ThermometerSun,
  Wind,
  Wrench,
} from 'lucide-react';

const registry = {
  Snowflake,
  AirVent,
  Flame,
  ThermometerSun,
  RefreshCw,
  Wrench,
  Wind,
  Leaf,
  Layers,
  Gauge,
  Droplets,
  Building2,
};

export function getIcon(name) {
  return registry[name] || Layers;
}

export default registry;
