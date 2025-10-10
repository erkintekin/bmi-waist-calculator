"use client";

import * as React from "react";
import {
  Box,
  TextField,
  Button,
  Typography,
  Stack,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  FormHelperText,
  Paper,
  Divider,
  Card,
  CardContent,
  Chip,
  Fade,
  Slide,
} from "@mui/material";
import { FitnessCenter, Height, Person, AccessTime } from "@mui/icons-material";
import { useForm, Controller } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { userFormSchema, genders } from "@/lib/validation";

// ---- Hesaplamalar ----
function calcBMI(weightKg: number, heightCm: number) {
  const h = heightCm / 100;
  const bmi = weightKg / (h * h);
  return Number(bmi.toFixed(1));
}

function bmiCategory(bmi: number) {
  if (bmi < 18.5) return "Zayıf";
  if (bmi < 25) return "Sağlıklı";
  if (bmi < 30) return "Şişman";
  if (bmi < 40) return "Obez";
  return "Morbid Obez";
}

function waistCategory(waist: number, gender: "Erkek" | "Kadın") {
  if (gender === "Kadın") {
    if (waist <= 80) return "Normal";
    if (waist <= 88) return "Riskli";
    return "Yüksek risk";
  } else {
    if (waist <= 94) return "Normal";
    if (waist <= 102) return "Riskli";
    return "Yüksek risk";
  }
}

/** Tahmini bel çevresi (cm) — heuristik: WHtR ~ BMI aralığı + cinsiyete göre */
function estimatedWaistCm(
  heightCm: number,
  bmi: number,
  gender: "Erkek" | "Kadın"
) {
  let whtr: number;
  if (bmi < 18.5) {
    whtr = gender === "Erkek" ? 0.42 : 0.41;
  } else if (bmi < 25) {
    whtr = gender === "Erkek" ? 0.47 : 0.45;
  } else if (bmi < 30) {
    whtr = gender === "Erkek" ? 0.53 : 0.52;
  } else {
    whtr = gender === "Erkek" ? 0.6 : 0.58;
  }
  const waist = heightCm * whtr;
  return Number(waist.toFixed(0));
}

// RHF tipleri: resolver input / output
type FormIn = z.input<typeof userFormSchema>;
type FormOut = z.output<typeof userFormSchema>;

export default function Home() {
  const {
    register,
    control,
    formState: { errors },
    watch,
    reset,
  } = useForm<FormIn, undefined, FormOut>({
    resolver: zodResolver(userFormSchema),
    mode: "onChange", // değiştikçe validate + hesapla
    reValidateMode: "onChange",
    defaultValues: {
      age: 25,
      height: 178,
      weight: 75,
      gender: "Erkek",
    } as unknown as FormIn,
  });

  // canlı değerler
  const height = watch("height");
  const weight = watch("weight");
  const gender = watch("gender");

  const live = React.useMemo(() => {
    const h = Number(height);
    const w = Number(weight);
    const g = gender as "Erkek" | "Kadın" | undefined;

    if (!h || !w || !g) {
      return {
        bmi: null as number | null,
        bmiCat: null as string | null,
        estWaist: null as number | null,
        waistCat: null as string | null,
      };
    }
    const bmi = calcBMI(w, h);
    const estWaist = estimatedWaistCm(h, bmi, g);
    return {
      bmi,
      bmiCat: bmiCategory(bmi),
      estWaist,
      waistCat: waistCategory(estWaist, g),
    };
  }, [height, weight, gender]);

  const hasLive = live.bmi !== null && live.estWaist !== null;

  return (
    <Fade in={true} timeout={800}>
      <Box
        component="div"
        className="animate-fade-in"
        sx={{
          maxWidth: 600,
          mx: "auto",
          mt: 4,
          mb: 4,
        }}
      >
        <Card
          elevation={0}
          sx={{
            background: "var(--card-background)",
            backdropFilter: "blur(20px)",
            borderRadius: 4,
            border: "1px solid rgba(255, 255, 255, 0.2)",
            boxShadow: "0 20px 40px rgba(0, 0, 0, 0.1)",
            overflow: "visible",
            position: "relative",
            "&::before": {
              content: '""',
              position: "absolute",
              top: 0,
              left: 0,
              right: 0,
              height: "4px",
              borderRadius: "16px 16px 0 0",
            },
          }}
        >
          <CardContent sx={{ p: 4 }}>
            <Box sx={{ textAlign: "center", mb: 4 }}>
              <Typography
                variant="h5"
                className="font-bold"
                gutterBottom
                sx={{
                  fontWeight: 500,
                  background: "var(--primary-gradient)",
                  backgroundClip: "text",
                  color: "transparent",
                  WebkitBackgroundClip: "text",
                  WebkitTextFillColor: "transparent",
                }}
              >
                BMI & Bel Çevresi Hesaplayıcı
              </Typography>
              <Typography
                variant="subtitle1"
                className="font-regular"
                color="text.secondary"
                sx={{ maxWidth: 300, mx: "auto" }}
              >
                BMI değerini ve tahmini bel çevresini hızlıca hesaplayın
              </Typography>
            </Box>

            <Stack spacing={3}>
              <Box
                sx={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 2 }}
              >
                <TextField
                  label="Yaş (opsiyonel)"
                  type="number"
                  inputProps={{ min: 0 }}
                  onWheel={(e) => (e.currentTarget as HTMLInputElement).blur()}
                  error={!!errors.age}
                  helperText={errors.age?.message}
                  {...register("age")}
                  required
                  InputProps={{
                    startAdornment: (
                      <AccessTime sx={{ mr: 1, color: "action.active" }} />
                    ),
                  }}
                  sx={{
                    "& .MuiOutlinedInput-root": {
                      borderRadius: 2,
                      "&:hover fieldset": {
                        borderColor: "#3498db",
                      },
                    },
                  }}
                />

                <FormControl required error={!!errors.gender}>
                  <InputLabel id="gender-label">Cinsiyet</InputLabel>
                  <Controller
                    name="gender"
                    control={control}
                    render={({ field }) => (
                      <Select
                        labelId="gender-label"
                        label="Cinsiyet"
                        {...field}
                        startAdornment={
                          <Person sx={{ mr: 1, color: "action.active" }} />
                        }
                        sx={{
                          borderRadius: 2,
                          "&:hover .MuiOutlinedInput-notchedOutline": {
                            borderColor: "#3498db",
                          },
                        }}
                      >
                        {genders.map((g) => (
                          <MenuItem key={g} value={g}>
                            {g}
                          </MenuItem>
                        ))}
                      </Select>
                    )}
                  />
                  {!!errors.gender && (
                    <FormHelperText>{errors.gender.message}</FormHelperText>
                  )}
                </FormControl>
              </Box>

              <TextField
                label="Boy (cm)"
                type="number"
                inputProps={{ min: 100, max: 250 }}
                onWheel={(e) => (e.currentTarget as HTMLInputElement).blur()}
                error={!!errors.height}
                helperText={errors.height?.message}
                {...register("height")}
                required
                fullWidth
                InputProps={{
                  startAdornment: (
                    <Height sx={{ mr: 1, color: "action.active" }} />
                  ),
                }}
                sx={{
                  "& .MuiOutlinedInput-root": {
                    borderRadius: 2,
                    "&:hover fieldset": {
                      borderColor: "#3498db",
                    },
                  },
                }}
              />

              <TextField
                label="Kilo (kg)"
                type="number"
                inputProps={{ min: 20, max: 400, step: "0.1" }}
                onWheel={(e) => (e.currentTarget as HTMLInputElement).blur()}
                error={!!errors.weight}
                helperText={errors.weight?.message}
                {...register("weight")}
                required
                fullWidth
                InputProps={{
                  startAdornment: (
                    <FitnessCenter sx={{ mr: 1, color: "action.active" }} />
                  ),
                }}
                sx={{
                  "& .MuiOutlinedInput-root": {
                    borderRadius: 2,
                    "&:hover fieldset": {
                      borderColor: "#3498db",
                    },
                  },
                }}
              />

              {/* Sonuçlar (canlı) */}
              {hasLive && (
                <Slide direction="up" in={hasLive} mountOnEnter unmountOnExit>
                  <Box>
                    <Divider sx={{ my: 3, opacity: 0.6 }} />
                    <Typography
                      variant="h5"
                      className="font-bold"
                      gutterBottom
                      sx={{
                        fontWeight: 400,
                        color: "var(--primary-color, #3498db)",
                        textAlign: "center",
                        mb: 3,
                      }}
                    >
                      Sonuçlarınız
                    </Typography>
                    <Box
                      sx={{
                        display: "grid",
                        gridTemplateColumns: "1fr 1fr",
                        gap: 2,
                        mb: 3,
                      }}
                    >
                      <Paper
                        elevation={0}
                        sx={{
                          p: 3,
                          borderRadius: 3,
                          background:
                            "linear-gradient(135deg, rgba(52, 152, 219, 0.1) 0%, rgba(155, 89, 182, 0.1) 100%)",
                          border: "1px solid rgba(52, 152, 219, 0.2)",
                          textAlign: "center",
                        }}
                      >
                        <Typography
                          variant="h4"
                          className="font-regular"
                          sx={{ fontWeight: 600, color: "#3498db" }}
                        >
                          {live.bmi}
                        </Typography>
                        <Typography
                          variant="body2"
                          className="font-regular"
                          color="text.secondary"
                          gutterBottom
                        >
                          BMI Değeri
                        </Typography>
                        <Chip
                          label={live.bmiCat}
                          className="font-regular"
                          size="small"
                          sx={{
                            bgcolor:
                              (live.bmi ?? 0) < 18.5
                                ? "#e74c3c"
                                : (live.bmi ?? 0) < 25
                                ? "#27ae60"
                                : (live.bmi ?? 0) < 30
                                ? "#f39c12"
                                : "#e74c3c",
                            color: "white",
                            fontWeight: 400,
                          }}
                        />
                      </Paper>

                      <Paper
                        elevation={0}
                        sx={{
                          p: 3,
                          borderRadius: 3,
                          background:
                            "linear-gradient(135deg, rgba(46, 204, 113, 0.1) 0%, rgba(39, 174, 96, 0.1) 100%)",
                          border: "1px solid rgba(46, 204, 113, 0.2)",
                          textAlign: "center",
                        }}
                      >
                        <Typography
                          variant="h4"
                          className="font-regular"
                          sx={{ fontWeight: 600, color: "#27ae60" }}
                        >
                          {live.estWaist} cm
                        </Typography>
                        <Typography
                          variant="body2"
                          className="font-regular"
                          color="text.secondary"
                          gutterBottom
                        >
                          Tahmini Bel Çevresi
                        </Typography>
                        <Chip
                          label={live.waistCat}
                          className="font-regular"
                          size="small"
                          sx={{
                            bgcolor:
                              (live.waistCat ?? "Normal") === "Yüksek Risk"
                                ? "#e74c3c"
                                : (live.waistCat ?? "Normal") === "Normal"
                                ? "#27ae60"
                                : (live.waistCat ?? "Normal") === "Riskli"
                                ? "#f39c12"
                                : "#e74c3c",
                            color: "white",
                            fontWeight: 400,
                          }}
                        />
                      </Paper>
                    </Box>

                    <Paper
                      elevation={0}
                      sx={{
                        p: 2,
                        borderRadius: 2,
                        background: "rgba(241, 196, 15, 0.1)",
                        border: "1px solid rgba(241, 196, 15, 0.3)",
                      }}
                    >
                      <Typography
                        variant="caption"
                        color="text.secondary"
                        className="font-regular"
                        sx={{
                          display: "block",
                          textAlign: "center",
                          fontStyle: "italic",
                        }}
                      >
                        ⚠️ Bu bel çevresi yalnızca yaklaşık bir tahmindir;
                        klinik değerlendirme yerine geçmez.
                      </Typography>
                    </Paper>
                  </Box>
                </Slide>
              )}

              <Box sx={{ mt: 4, display: "flex", gap: 2 }}>
                <Button
                  variant="outlined"
                  onClick={() => reset()}
                  className="font-regular"
                  fullWidth
                  sx={{
                    borderRadius: 2,
                    py: 1.5,
                    borderColor: "#bdc3c7",
                    color: "#7f8c8d",
                    "&:hover": {
                      borderColor: "#95a5a6",
                      bgcolor: "rgba(189, 195, 199, 0.04)",
                    },
                  }}
                >
                  🔄 Sıfırla
                </Button>
                {hasLive && (
                  <Button
                    variant="contained"
                    fullWidth
                    className="animate-pulse"
                    sx={{
                      borderRadius: 2,
                      py: 1.5,
                      background: "var(--primary-gradient)",
                      boxShadow: "0 4px 15px rgba(52, 152, 219, 0.4)",
                      "&:hover": {
                        boxShadow: "0 6px 20px rgba(52, 152, 219, 0.6)",
                        transform: "translateY(-2px)",
                      },
                      transition: "all 0.3s ease",
                    }}
                    onClick={() => {
                      if (navigator.share) {
                        navigator.share({
                          title: "BMI Sonuçlarım",
                          text: `BMI: ${live.bmi} (${live.bmiCat}), Tahmini Bel Çevresi: ${live.estWaist} cm`,
                        });
                      }
                    }}
                  >
                    📤 Paylaş
                  </Button>
                )}
              </Box>
            </Stack>
          </CardContent>
        </Card>
      </Box>
    </Fade>
  );
}
