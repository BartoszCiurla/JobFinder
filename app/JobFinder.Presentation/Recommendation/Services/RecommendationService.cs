using System;
using System.Collections.Generic;
using System.Linq;
using JobFinder.Domain.Applications.Entities;
using JobFinder.Domain.JobApplications.Entities;
using JobFinder.Domain.Offers.Entities;
namespace JobFinder.Presentation.Recommendation.Services
{
    public class RecommendationService : IRecommendationService
    {
        private double ScoreRange => 5;
        private double RequiredSkillScore => 1;
        private double WelcomeSkillScore => 0.5;
        private double LanguageScore => 0.4;
        private double CertificationsScore => 0.15;
        public double CalculateScore(Offer offer, JobApplication jobApplication)
        {
            double score = 0;
            score += CalculateRequiredSkillsScore(offer.RequiredSkills, jobApplication.Skills, RequiredSkillScore);
            score += CalculateWelcomeSkillsScore(offer.WelcomeSkills, jobApplication.Skills, WelcomeSkillScore);
            score += CalculateLanguageScore(offer.Languages, jobApplication.Languages, LanguageScore);
            score += CalculateCertificationsScore(offer.CertificatesWillBeAnAdvantage, offer.Profession.Category.Id, jobApplication.Certificates, CertificationsScore);
            return score;
        }
        private double CalculateScoreByLevel(double requiredLevel, double level, double baseScore)
        {
            return requiredLevel == level || requiredLevel < level? baseScore: (level / ScoreRange) * baseScore;
        }
        private double CalculateRequiredSkillsScore(ICollection<OfferRequiredSkill> requiredSkills,
            ICollection<JobApplicationSkill> skills,
            double baseScore)
        {
            if (!requiredSkills.Any() && !skills.Any()) return 0;

            return requiredSkills.Select(offerRequiredSkill =>
            {
                var skill = skills.FirstOrDefault(s => s.Skill.Id == offerRequiredSkill.Skill.Id);
                if (skill == null) return 0;

                return CalculateScoreByLevel(offerRequiredSkill.Level, skill.Level, baseScore);
            }).Sum();
        }
        private double CalculateWelcomeSkillsScore(ICollection<OfferWelcomeSkill> welcomeSkills,
            ICollection<JobApplicationSkill> skills,
            double baseScore)
        {
            if (!welcomeSkills.Any() && !skills.Any()) return 0;

            return welcomeSkills.Select(offerWelcomeSkill =>
            {
                var skill = skills.FirstOrDefault(s => s.Skill.Id == offerWelcomeSkill.Skill.Id);
                if (skill == null) return 0;

                return CalculateScoreByLevel(offerWelcomeSkill.Level, skill.Level, baseScore);
            }).Sum();
        }
        private double CalculateLanguageScore(ICollection<OfferLanguage> requiredLanguages,
            ICollection<JobApplicationLanguage> languages,
            double baseScore)
        {
            if (!requiredLanguages.Any() && !languages.Any()) return 0;

            return requiredLanguages.Select(requiredLanguage =>
            {
                var language = languages.FirstOrDefault(l => l.Language.Id == requiredLanguage.Language.Id);
                if (language == null) return 0;

                return CalculateScoreByLevel(requiredLanguage.Level, language.Level, baseScore);
            }).Sum();
        }
        private double CalculateCertificationsScore(bool certificatesWillBeAnAdvantage,
            Guid professionCategoryId,
            ICollection<JobApplicationCertificate> certificates,
            double baseScore)
        {
            return !certificatesWillBeAnAdvantage? 0 : certificates.Any(c => c.Certificate.ProfessionCategoryId == professionCategoryId) ? baseScore : 0;
        }
    }
}
